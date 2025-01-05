import { useFleetStore } from "@/stores/fleet.store";
import { useStationsStore } from "@/stores/stations.store";
import { useTimeStore } from "@/stores/time.store";
import { useTravelStore } from "@/stores/travel.store";

const STORAGE_KEY = "game-state";

interface GameState {
  time: ReturnType<typeof useTimeStore.getState>;
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
      time: useTimeStore.getState(),
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
      useTimeStore.setState(state.time);
    }
  };

  return {
    saveGame,
    loadGame,
  };
};
