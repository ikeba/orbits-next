import Link from "next/link";
import FlexWrap from "../shared/FlexWrap";
import Clock from "./Clock";

export default function Header() {
  return (
    <header className="tw-px-4 tw-py-2 tw-border-b tw-border-white">
      <FlexWrap direction="row" justify="space-between">
        <FlexWrap direction="row">
          <Link href="/">Menu</Link>
          <Link href="/game">Game</Link>
        </FlexWrap>
        <Clock />
      </FlexWrap>
    </header>
  );
}
