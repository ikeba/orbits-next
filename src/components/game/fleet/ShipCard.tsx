import FlexWrap from "@/components/shared/FlexWrap";
import { FleetService } from "@/services/fleet.service";
import { useStationsStore } from "@/stores/stations.store";
import { Ship } from "@/types/Ship";
import { useMemo } from "react";
import TravelMenu from "./TravelMenu";
import TravelProgress from "../TravelProgress";
import ShipStatusIcon from "./ShipStatusIcon";
import { TravelService } from "@/services/travel.service";
import ShipCargoStatus from "./ShipCargoStatus";

export default function ShipCard({ ship }: { ship: Ship }) {
  const stations = useStationsStore((state) => state.stations);
  const currentStationName = useStationsStore(
    (state) => state.getStationById(ship?.positionId || "")?.name
  );

  const targetStationName = useMemo(() => {
    if (!ship?.travelId) return null;

    return TravelService.getTravelTargetStation(ship.travelId)?.name;
  }, [ship?.travelId]);

  const travelTargets = useMemo(
    () => stations.filter((station) => station.id !== ship?.positionId),
    [stations, ship?.positionId]
  );

  const moveToStation = (stationId: string) => {
    if (!ship) return;
    FleetService.moveShip({ shipId: ship.id, destinationId: stationId });
  };

  return (
    <div className="tw-bg-o-darker tw-p-2 tw-rounded-xs tw-border tw-border-white/50 tw-w-[20%]">
      <FlexWrap direction="row" justify="space-between" className="tw-gap-2">
        <FlexWrap direction="column" className="tw-flex-1 tw-gap-1">
          <div className="tw-text-sm tw-font-bold">{ship.name}</div>
          <ShipCargoStatus ship={ship} />
          <FlexWrap
            direction="row"
            align="center"
            wrap="nowrap"
            className="tw-gap-1"
          >
            <ShipStatusIcon status={ship.status} />
            {ship?.positionId ? (
              <div className="tw-text-xs">{currentStationName}</div>
            ) : (
              <div className="tw-text-xs tw-italic">{targetStationName}</div>
            )}
          </FlexWrap>
          <TravelProgress
            shipId={ship.id}
            className={!ship.travelId ? "tw-opacity-0" : ""}
          />
        </FlexWrap>
        <TravelMenu
          targets={travelTargets}
          onSelect={moveToStation}
          disabled={!!ship.travelId}
        />
      </FlexWrap>
    </div>
  );
}
