"use client";

import { useGameSave } from "@/hooks/useSaveLoad";
import { Button } from "@mantine/core";

export const SaveControls = () => {
  const { saveGame, loadGame, resetGame } = useGameSave();

  return (
    <div className="flex gap-2">
      <Button size="xs" onClick={saveGame} variant="subtle">
        Save Game
      </Button>
      <Button size="xs" onClick={loadGame} variant="subtle">
        Load Game
      </Button>
      <Button size="xs" onClick={resetGame} variant="subtle" color="red">
        Reset Game
      </Button>
    </div>
  );
};
