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

  start: () => void;
  pause: () => void;
  setSpeed: (speed: number) => void;
  setScenario: (scenario: GameScenario) => void;
}

export const useGameStore = create<GameState>((set, get) => {
  const timeSystem = () => {
    const { speed, startTime, tick } = get();
    const currentTime = Date.now();
    const newTick = ((currentTime - startTime) / 1000) * speed;

    if (Math.abs(newTick - tick) >= 0.1) {
      set(() => ({
        tick: newTick,
      }));
    }
  };

  gameLoop.addSystem(GameLoopSystem.Game, timeSystem);

  const start = () => {
    set({
      isRunning: true,
      startTime: Date.now(),
    });
    gameLoop.start();
  };

  const pause = () => {
    set({ isRunning: false });
    gameLoop.pause();
  };

  const setSpeed = (speed: number) => {
    set({ speed });
  };

  const setScenario = (scenario: GameScenario) => {
    set({ scenario });
  };

  return {
    startTime: Date.now(),
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
