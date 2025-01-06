import FlexWrap from "./FlexWrap";

interface UiListProps {
  items: {
    id: string;
    label: string;
    afterLabel?: string | React.ReactNode;
  }[];
  bordered?: boolean;
  className?: string;
  onItemClick: (id: string) => void;
}

export default function UiList({
  items,
  onItemClick,
  bordered = false,
  className,
}: UiListProps) {
  const borderItemClassName = bordered ? " tw-border-b tw-border-white" : "";
  const hoverItemClassName =
    "tw-cursor-pointer hover:tw-bg-white/10 tw-transition-colors";
  const commonItemClassName = "tw-p-2";

  return (
    <div className={className}>
      {items.map((item) => (
        <FlexWrap
          className={`${borderItemClassName} ${hoverItemClassName} ${commonItemClassName}`}
          key={item.id}
          justify="space-between"
          onClick={() => onItemClick(item.id)}
        >
          <div>{item.label}</div>
          {item.afterLabel && <div>{item.afterLabel}</div>}
        </FlexWrap>
      ))}
    </div>
  );
}
