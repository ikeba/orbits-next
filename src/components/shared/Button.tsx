export default function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="tw-px-2 tw-py-1 tw-rounded-md tw-border tw-border-white hover:tw-opacity-80"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
