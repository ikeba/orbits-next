interface UiListProps {
  items: {
    id: string;
    label: string;
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
    <ul className={className}>
      {items.map((item) => (
        <li
          className={`${borderItemClassName} ${hoverItemClassName} ${commonItemClassName}`}
          key={item.id}
          onClick={() => onItemClick(item.id)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
}
