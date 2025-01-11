import { IconCoin } from "@tabler/icons-react";
import { usePlayerCredits } from "@/hooks/usePlayerCredits";

export default function PlayerCredits() {
  const credits = usePlayerCredits();

  return (
    <div className="tw-flex tw-items-center tw-gap-1">
      <IconCoin size={16} className="tw-text-yellow-500" />
      <span className="tw-font-mono">{credits.toLocaleString()}</span>
    </div>
  );
}
