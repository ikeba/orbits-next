import Link from "next/link";

export default function GameNavigation() {
  const linkClasses =
    "hover:tw-opacity-50 tw-cursor-pointer tw-transition-opacity";

  return (
    <nav className="tw-flex tw-flex-col tw-gap-2 tw-border-r tw-border-white tw-h-full tw-p-4">
      <Link className={linkClasses} href="/game/fleet">
        Fleet
      </Link>
      <Link className={linkClasses} href="/game/map">
        Map
      </Link>
    </nav>
  );
}
