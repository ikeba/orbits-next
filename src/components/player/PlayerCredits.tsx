import { IconCoin } from "@tabler/icons-react";
import { usePlayerCredits } from "@/hooks/usePlayerCredits";
import FlexWrap from "../shared/FlexWrap";

export default function PlayerCredits() {
  const credits = usePlayerCredits();

  return (
    <FlexWrap direction="row" align="center" className="tw-gap-1">
      <IconCoin size={16} className="tw-text-yellow-500" />
      <span className="tw-font-mono tw-text-xs">
        {credits.toLocaleString()}
      </span>
    </FlexWrap>
  );
}
