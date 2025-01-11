"use client";

import Link from "next/link";
import { Button } from "@mantine/core";
import FlexWrap from "../shared/FlexWrap";
import Clock from "./Clock";
import { SaveControls } from "./SaveControls";
import PlayerCredits from "../player/PlayerCredits";

export default function Header() {
  return (
    <header className="tw-p-2 tw-border-b tw-border-white">
      <FlexWrap direction="row" justify="space-between">
        <FlexWrap direction="row" align="center" className="tw-gap-2">
          <Link href="/">
            <Button variant="subtle">Menu</Button>
          </Link>
          <Link href="/game/fleet">
            <Button variant="subtle">Game</Button>
          </Link>
          <SaveControls />
        </FlexWrap>
        <FlexWrap direction="row" align="center" className="tw-gap-4">
          <PlayerCredits />
          <Clock />
        </FlexWrap>
      </FlexWrap>
    </header>
  );
}
