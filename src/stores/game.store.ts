import { create } from "zustand";
import { gameLoop } from "@/services/game-loop";
import { GameScenario } from "@/types/Scenario";
import { GameLoopSystem } from "@/types/GameLoopSystems";

interface GameState {
  startTime: number;
  tick: number;
  isRunning: boolean;
  speed: number;
  scenario: GameScenario | null;
  isInitialized: boolean;
  error: string | null;

  // Actions
  start: () => void;
  pause: () => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
  setScenario: (scenario: GameScenario) => void;
  setInitialized: (initialized: boolean) => void;
  setError: (error: string | null) => void;
}

const initialState = {
  startTime: Date.now(),
  tick: 0,
  isRunning: false,
  speed: 1,
  scenario: null,
  isInitialized: false,
  error: null,
};

export const useGameStore = create<GameState>((set, get) => {
  const timeSystem = () => {
    const { speed, startTime, tick } = get();
    const currentTime = Date.now();
    const newTick = ((currentTime - startTime) / 1000) * speed;

    if (Math.abs(newTick - tick) >= 0.1) {
      set(() => ({ tick: newTick }));
    }
  };

  gameLoop.addSystem(GameLoopSystem.Game, timeSystem);

  return {
    ...initialState,

    start: () => {
      set({
        isRunning: true,
        startTime: Date.now(),
      });
      gameLoop.start();
    },

    pause: () => {
      set({ isRunning: false });
      gameLoop.pause();
    },

    reset: () => {
      set(initialState);
    },

    setSpeed: (speed: number) => {
      set({ speed });
    },

    setScenario: (scenario: GameScenario) => {
      set({ scenario });
    },

    setInitialized: (initialized: boolean) => {
      set({ isInitialized: initialized });
    },

    setError: (error: string | null) => {
      set({ error });
    },
  };
});
