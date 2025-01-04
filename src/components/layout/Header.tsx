import Link from "next/link";

export default function Header() {
  return (
    <header className="tw-px-4 tw-py-2 tw-border-b tw-border-white">
      <div className="tw-flex tw-gap-6 tw-flex-wrap tw-items-center">
        <Link href="/">Menu</Link>
        <Link href="/game">Game</Link>
      </div>
    </header>
  );
}
