import Link from "next/link";

export default function GameNavigation() {
  const linkClasses =
    "hover:tw-opacity-50 tw-cursor-pointer tw-transition-opacity tw-border-b tw-border-white tw-p-2";

  return (
    <nav className="tw-flex tw-flex-col tw-border-r tw-border-white tw-h-full">
      <Link className={linkClasses} href="/game/fleet">
        Fleet
      </Link>
      <Link className={linkClasses} href="/game/map">
        Map
      </Link>
    </nav>
  );
}
