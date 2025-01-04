type system = (delta: number) => void;

class GameLoop {
  private systems: system[] = [];
  private lastTime: number = 0;
  private isRunning: boolean = false;

  addSystem(system: system) {
    this.systems.push(system);
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

  private tick() {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const delta = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.systems.forEach((system) => system(delta));

    requestAnimationFrame(this.tick.bind(this));
  }
}

export const gameLoop = new GameLoop();
