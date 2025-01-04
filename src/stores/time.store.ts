import { create } from "zustand";
import { gameLoop } from "@/services/game-loop";

interface TimeState {
  tick: number;
  isRunning: boolean;
  speed: number;

  start: () => void;
  pause: () => void;
  setSpeed: (speed: number) => void;
}

export const useTimeStore = create<TimeState>((set, get) => {
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

  return {
    tick: 0,
    isRunning: true,
    speed: 1,

    start,
    pause,
    setSpeed,
  };
});
