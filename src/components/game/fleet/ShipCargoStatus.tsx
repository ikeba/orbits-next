import CargoIcon from "@/components/icons/CargoIcon";
import FlexWrap from "@/components/shared/FlexWrap";
import { getShipCargoStatus } from "@/helpers/ship.helper";
import { Ship } from "@/types/Ship";

export default function ShipCargoStatus({ ship }: { ship: Ship }) {
  const cargoStatus = getShipCargoStatus(ship);
  return (
    <FlexWrap direction="row" align="center" wrap="nowrap" className="tw-gap-1">
      <CargoIcon />
      <div className="tw-text-xs">
        {cargoStatus.amount}/{ship.cargoSize}
      </div>
    </FlexWrap>
  );
}
