import { create } from "zustand";
import { gameLoop } from "@/services/game-loop";
import { GameScenario } from "@/types/Scenario";

interface GameState {
  tick: number;
  isRunning: boolean;
  speed: number;
  scenario: GameScenario | null;

  start: () => void;
  pause: () => void;
  setSpeed: (speed: number) => void;
  setScenario: (scenario: GameScenario) => void;
}

export const useGameStore = create<GameState>((set, get) => {
  const timeSystem = (delta: number) => {
    const { speed } = get();
    set((state) => ({
      tick: state.tick + delta * speed,
    }));
  };

  gameLoop.addSystem(timeSystem);

  const start = () => {
    set({ isRunning: false });
    gameLoop.start();
  };

  const pause = () => {
    set({ isRunning: true });
    gameLoop.pause();
  };

  const setSpeed = (speed: number) => {
    set({ speed });
  };

  const setScenario = (scenario: GameScenario) => {
    set({ scenario });
  };

  return {
    tick: 0,
    isRunning: true,
    speed: 1,
    scenario: null,
    start,
    pause,
    setSpeed,
    setScenario,
  };
});
