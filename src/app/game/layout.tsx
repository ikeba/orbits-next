"use client";

import GameNavigation from "@/components/game/GameNavigation";
import { GameInitializer } from "@/components/game/GameInitializer";
import FleetPanel from "@/components/game/panels/FleetPanel";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameInitializer>
      <div className="tw-h-full tw-grid tw-grid-cols-[240px_1fr]">
        <aside>
          <GameNavigation />
        </aside>
        <div>{children}</div>
        <FleetPanel />
      </div>
    </GameInitializer>
  );
}
