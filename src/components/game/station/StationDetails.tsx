import { Station } from "@/types/Station";
import ProductionFacilities from "@/components/game/production/ProductionFacilities";
import Market from "@/components/game/market/Market";
import FlexWrap from "@/components/shared/FlexWrap";
import { Ship } from "@/types/Ship";

interface StationDetailsProps {
  station: Station;
  dockedShips: Ship[];
}

export default function StationDetails({
  station,
  dockedShips,
}: StationDetailsProps) {
  return (
    <FlexWrap direction="column" className="tw-p-4">
      <h1>{station.name}</h1>
      <h2>Station Type: {station.type}</h2>

      <ProductionFacilities station={station} />

      <Market source={station} destination={dockedShips[0] ?? null} />
    </FlexWrap>
  );
}
