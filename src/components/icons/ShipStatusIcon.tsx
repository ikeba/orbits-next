import { Ship, ShipStatus } from "@/types/Ship";
import { IconAnchor, IconRoute } from "@tabler/icons-react";

export default function ShipStatusIcon({ status }: { status: Ship["status"] }) {
  return {
    [ShipStatus.Idle]: <IconAnchor size="1rem" />,
    [ShipStatus.Moving]: <IconRoute size="1rem" />,
  }[status];
}
