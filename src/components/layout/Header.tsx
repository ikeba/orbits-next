import Link from "next/link";
import FlexWrap from "../shared/FlexWrap";
import Clock from "./Clock";

export default function Header() {
  return (
    <header className="tw-p-2 tw-border-b tw-border-white">
      <FlexWrap direction="row" justify="space-between">
        <FlexWrap direction="row" className="tw-gap-4">
          <Link href="/">Menu</Link>
          <Link href="/game/fleet">Game</Link>
        </FlexWrap>
        <Clock />
      </FlexWrap>
    </header>
  );
}
