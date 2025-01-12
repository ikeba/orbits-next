import FlexWrap from "@/components/shared/FlexWrap";
import { getShipCargoStatus } from "@/helpers/ship.helper";
import { Ship } from "@/types/Ship";
import { IconBarrel } from "@tabler/icons-react";

export default function ShipCargoStatus({ ship }: { ship: Ship }) {
  const cargoStatus = getShipCargoStatus(ship);
  return (
    <FlexWrap direction="row" align="center" wrap="nowrap" className="tw-gap-1">
      <IconBarrel size="1rem" />
      <div className="tw-text-xs">
        {cargoStatus.amount}/{ship.cargoSize}
      </div>
    </FlexWrap>
  );
}
