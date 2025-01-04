import UiButton from "@/components/shared/UiButton";
import FlexWrap from "@/components/shared/FlexWrap";
import { Ship } from "@/types/Ship";
import { useStationsStore } from "@/stores/stations.store";

export default function ShipDetails({ ship }: { ship: Ship }) {
  const { getStationById } = useStationsStore();

  const moveToStation = () => {
    console.log("moveToStation");
  };

  return (
    <div>
      <FlexWrap direction="column">
        <b>{ship.name}</b>
        <p>Status: {ship.status}</p>
        {ship.stationId && (
          <p>Station: {getStationById(ship.stationId)?.name}</p>
        )}
        <UiButton onClick={moveToStation}>Move to the next station</UiButton>
      </FlexWrap>
    </div>
  );
}
