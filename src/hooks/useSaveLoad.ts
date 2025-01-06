import { useFleetStore } from "@/stores/fleet.store";
import { useStationsStore } from "@/stores/stations.store";
import { useTravelStore } from "@/stores/travel.store";
import { useGameStore } from "@/stores/game.store";

const STORAGE_KEY = "game-state";

interface GameState {
  game: ReturnType<typeof useGameStore.getState>;
  fleet: ReturnType<typeof useFleetStore.getState>;
  stations: ReturnType<typeof useStationsStore.getState>;
  travel: ReturnType<typeof useTravelStore.getState>;
}

export const useGameSave = () => {
  const saveGame = () => {
    const state: GameState = {
      fleet: useFleetStore.getState(),
      stations: useStationsStore.getState(),
      travel: useTravelStore.getState(),
      game: useGameStore.getState(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };

  const loadGame = () => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const state: GameState = JSON.parse(savedState);

      useFleetStore.setState(state.fleet);
      useStationsStore.setState(state.stations);
      useTravelStore.setState(state.travel);
      useGameStore.setState(state.game);
    }
  };

  const resetGame = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  return {
    saveGame,
    loadGame,
    resetGame,
  };
};
