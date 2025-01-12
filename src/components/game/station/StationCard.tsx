import FlexWrap from "@/components/shared/FlexWrap";
import { Station } from "@/types/Station";
import StationIcon from "@/components/icons/StationIcon";

export default function StationCard({
  station,
  onClick,
  selected,
}: {
  station: Station;
  onClick: () => void;
  selected: boolean;
}) {
  return (
    <div
      className={`tw-bg-o-darker tw-p-2 tw-rounded-xs tw-border tw-border-white/50 tw-w-full ${
        selected ? "tw-border-o-primary" : ""
      }`}
    >
      <FlexWrap direction="row" justify="space-between" className="tw-gap-2">
        <FlexWrap direction="column" className="tw-flex-1 tw-gap-1">
          <FlexWrap
            direction="row"
            align="center"
            wrap="nowrap"
            className="tw-group tw-gap-1"
            onClick={onClick}
          >
            <StationIcon type={station.type} />
            <div className="tw-text-sm tw-font-bold group-hover:tw-underline group-hover:tw-cursor-pointer">
              {station.name}
            </div>
          </FlexWrap>
        </FlexWrap>
      </FlexWrap>
    </div>
  );
}
