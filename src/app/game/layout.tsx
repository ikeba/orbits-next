"use client";

import GameNavigation from "@/components/game/GameNavigation";

import { useEffect } from "react";
import { useGameStore } from "@/stores/game.store";
import { useGameSave } from "@/hooks/useSaveLoad";
import { useSearchParams } from "next/navigation";
import { scenarioManager } from "@/services/scenario-manager";
import { defaultScenario } from "@/scenarios/default-scenario.scenario";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { start, pause } = useGameStore();
  const { loadGame } = useGameSave();

  const searchParams = useSearchParams();

  useEffect(() => {
    // start the game loop
    start();
    // load the game on initial load
    if (searchParams.get("autoload") === "true") {
      loadGame();
    } else {
      scenarioManager.startScenario(defaultScenario);
    }

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
