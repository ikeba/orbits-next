"use client";

import { useGameSave } from "@/hooks/useSaveLoad";
import { Button } from "@mantine/core";

export const SaveControls = () => {
  const { saveGame, loadGame } = useGameSave();

  return (
    <div className="flex gap-2">
      <Button onClick={saveGame} variant="subtle">
        Save Game
      </Button>
      <Button onClick={loadGame} variant="subtle">
        Load Game
      </Button>
    </div>
  );
};
