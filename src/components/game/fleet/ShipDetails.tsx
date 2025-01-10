import FlexWrap from "@/components/shared/FlexWrap";
import { Ship } from "@/types/Ship";
import TravelDetails from "./TravelDetails";

export default function ShipDetails({ ship }: { ship: Ship }) {
  return (
    <div className="tw-p-4">
      <FlexWrap direction="column">
        <b>{ship.name}</b>
        <p>Status: {ship.status}</p>

        <TravelDetails shipId={ship.id} />
      </FlexWrap>
    </div>
  );
}
