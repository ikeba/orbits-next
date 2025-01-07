import { GameLoopSystem } from "@/types/GameLoopSystems";

type system = (delta: number) => void;

class GameLoop {
  private readonly TARGET_FPS = 30;
  private readonly FRAME_TIME = 1000 / this.TARGET_FPS;
  private lastFrameTime = 0;

  // @todo: fix this
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private systems: Record<GameLoopSystem, system> = {};
  private lastTime: number = 0;
  private isRunning: boolean = false;

  addSystem(name: GameLoopSystem, system: system) {
    if (this.systems[name]) return;

    this.systems[name] = system;
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.lastTime = performance.now();
      this.tick();
    }
  }

  pause() {
    this.isRunning = false;
  }

  private tick = () => {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const elapsed = currentTime - this.lastFrameTime;

    if (elapsed > this.FRAME_TIME) {
      const delta = (currentTime - this.lastTime) / 1000;
      this.lastTime = currentTime;
      this.lastFrameTime = currentTime;

      Object.values(this.systems).forEach((system) => system(delta));
    }

    requestAnimationFrame(this.tick);
  };
}

export const gameLoop = new GameLoop();
