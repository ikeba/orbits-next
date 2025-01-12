"use client";

import GameNavigation from "@/components/game/GameNavigation";
import { GameInitializer } from "@/components/game/GameInitializer";
import FleetPanel from "@/components/game/panels/FleetPanel";
import FlexWrap from "@/components/shared/FlexWrap";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameInitializer>
      <FlexWrap direction="column" className="tw-h-full">
        <GameNavigation />
        <div className="tw-flex-1">{children}</div>
        <FleetPanel />
      </FlexWrap>
    </GameInitializer>
  );
}
