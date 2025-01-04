import Link from "next/link";

export default function Footer() {
  return (
    <footer className="tw-px-4 tw-py-2 tw-border-t tw-border-white tw-row-start-3 tw-flex tw-gap-6 tw-flex-wrap tw-items-center">
      <Link href="/">Main Menu</Link>
      <Link href="/game">Game</Link>
    </footer>
  );
}
