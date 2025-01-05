"use client";

import GameNavigation from "@/components/game/GameNavigation";

import { useEffect } from "react";
import { useTimeStore } from "@/stores/time.store";
import { useGameSave } from "@/hooks/useSaveLoad";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { start, pause } = useTimeStore();
  const { loadGame } = useGameSave();

  useEffect(() => {
    // start the game loop
    start();
    // load the game on initial load
    loadGame();

    return () => {
      pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tw-h-full tw-grid tw-grid-cols-[240px_1fr]">
      <aside>
        <GameNavigation />
      </aside>
      <div>{children}</div>
    </div>
  );
}
