import Link from "next/link";
import { Button } from "@mantine/core";
import FlexWrap from "../shared/FlexWrap";
import Clock from "./Clock";
import { SaveControls } from "./SaveControls";

export default function Header() {
  return (
    <header className="tw-p-2 tw-border-b tw-border-white">
      <FlexWrap direction="row" justify="space-between">
        <FlexWrap direction="row" align="center">
          <Link href="/">
            <Button variant="subtle">Menu</Button>
          </Link>
          <Link href="/game/fleet">
            <Button variant="subtle">Game </Button>
          </Link>
          <SaveControls />
        </FlexWrap>
        <Clock />
      </FlexWrap>
    </header>
  );
}
