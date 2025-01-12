import { Ship, ShipStatus } from "@/types/Ship";
import { IconAnchor, IconRocket } from "@tabler/icons-react";

export default function ShipStatusIcon({ status }: { status: Ship["status"] }) {
  return {
    [ShipStatus.Idle]: <IconAnchor size="1rem" />,
    [ShipStatus.Moving]: <IconRocket size="1rem" />,
  }[status];
}
