import Link from "next/link";

export default function GameNavigation() {
  return (
    <nav className="tw-flex tw-flex-col tw-gap-2 tw-border-r tw-border-white tw-h-full tw-p-4">
      <Link href="/game/map">Map</Link>
      <Link href="/game/ship">Ship</Link>
    </nav>
  );
}
