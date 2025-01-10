import { memo, useMemo } from "react";

import { FleetService } from "@/services/fleet.service";

import { useFleetStore } from "@/stores/fleet.store";
import { useStationsStore } from "@/stores/stations.store";
import { useTravel } from "@/hooks/useTravel.hook";

import FlexWrap from "@/components/shared/FlexWrap";
import TravelMenu from "./TravelMenu";

const TravelProgress = memo(({ shipId }: { shipId: string }) => {
  const { progress } = useTravel(shipId);
  return <p>Progress: {progress}%</p>;
});

export default function TravelDetails({ shipId }: { shipId: string }) {
  const ship = useFleetStore((state) => state.getShipById(shipId));
  const stations = useStationsStore((state) => state.stations);
  const getStationName = useStationsStore(
    (state) => state.getStationById(ship?.positionId || "")?.name
  );

  const travelTargets = useMemo(
    () => stations.filter((station) => station.id !== ship?.positionId),
    [stations, ship?.positionId]
  );

  const moveToStation = (stationId: string) => {
    if (!ship) return;
    FleetService.moveShip({ shipId, destinationId: stationId });
  };

  if (!ship) return null;

  return (
    <FlexWrap direction="column">
      <b>--- Travel ---</b>

      {ship.positionId ? (
        // Show current station and travel menu when docked
        <div className="tw-space-y-2">
          <p className="tw-text-lg">
            Current Station:{" "}
            <span className="tw-font-medium">{getStationName}</span>
          </p>
          <TravelMenu targets={travelTargets} onSelect={moveToStation} />
        </div>
      ) : (
        // Show travel progress when ship is in transit
        <TravelProgress shipId={shipId} />
      )}
    </FlexWrap>
  );
}
