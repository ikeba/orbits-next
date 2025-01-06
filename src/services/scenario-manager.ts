import { GameScenario } from "@/types/Scenario";

class ScenarioManager {
  private currentScenario: GameScenario | null = null;

  startScenario(scenario: GameScenario) {
    this.currentScenario = scenario;
    this.currentScenario.setup();
  }
}

export const scenarioManager = new ScenarioManager();
