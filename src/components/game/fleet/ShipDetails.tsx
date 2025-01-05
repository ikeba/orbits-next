import UiButton from "@/components/shared/UiButton";
import FlexWrap from "@/components/shared/FlexWrap";
import { Ship } from "@/types/Ship";
import { useStationsStore } from "@/stores/stations.store";
import { useTravelStore } from "@/stores/travel.store";

export default function ShipDetails({ ship }: { ship: Ship }) {
  const { stations, getStationById } = useStationsStore();
  const { addTravel } = useTravelStore();

  const moveToStation = () => {
    addTravel({
      shipId: ship.id,
      fromId: ship.positionId,
      toId: stations[1].id,
      speed: 1,
    });
  };

  return (
    <div className="tw-p-4">
      <FlexWrap direction="column">
        <b>{ship.name}</b>
        <p>Status: {ship.status}</p>
        {ship.positionId && (
          <p>Station: {getStationById(ship.positionId)?.name}</p>
        )}
        <UiButton onClick={moveToStation}>Move to the next station</UiButton>
      </FlexWrap>
    </div>
  );
}
