import { GameScenario } from "@/types/Scenario";
import { useGameStore } from "@/stores/game.store";
import { gameLoop } from "@/services/game-loop";
import { defaultScenario } from "@/scenarios/default-scenario.scenario";

export class GameService {
  /**
   * Initialize game with selected scenario
   * Returns a promise that resolves when initialization is complete
   */
  static async initializeGame(
    scenario: GameScenario = defaultScenario
  ): Promise<void> {
    const gameStore = useGameStore.getState();

    // 🚀 Check if game is already initialized
    if (gameStore.isInitialized) {
      console.log("🎮 Game is already initialized, skipping initialization");
      return;
    }

    try {
      // 1. Reset game state
      gameStore.reset();

      // 2. Set initial scenario
      gameStore.setScenario(scenario);

      // 3. Run scenario setup
      await scenario.setup();

      // 4. Start game loop
      gameStore.start();

      // 5. Mark game as initialized
      gameStore.setInitialized(true);

      console.log("🎮 Game initialized successfully!");
    } catch (error) {
      console.error("🤬 Failed to initialize game:", error);
      gameStore.setError("Failed to initialize game");
      throw error;
    }
  }

  /**
   * Clean shutdown of the game
   */
  static shutdown(): void {
    const gameStore = useGameStore.getState();

    // Only shutdown if game was initialized
    if (!gameStore.isInitialized) {
      return;
    }

    // Stop game loop
    gameLoop.pause();

    // Reset game state
    gameStore.reset();

    console.log("🎮 Game shutdown complete");
  }

  /**
   * Check if game is fully initialized and ready
   */
  static isGameReady(): boolean {
    const { isInitialized, error } = useGameStore.getState();
    return isInitialized && !error;
  }
}
