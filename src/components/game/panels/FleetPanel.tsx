import FlexWrap from "@/components/shared/FlexWrap";
import { Ship } from "@/types/Ship";
import { useFleetStore } from "@/stores/fleet.store";
import ShipCard from "../fleet/ShipCard";

export default function FleetPanel() {
  const { ships } = useFleetStore();

  return (
    <div className="tw-fixed tw-bottom-0 tw-left-0 tw-right-0 tw-bg-o-dark tw-p-2 tw-border-t tw-border-white/50">
      <FlexWrap
        direction="row"
        wrap="nowrap"
        className="tw-space-x-4 tw-overflow-x-auto"
      >
        {ships.map((ship: Ship) => (
          <ShipCard key={ship.id} ship={ship} />
        ))}
      </FlexWrap>
    </div>
  );
}
