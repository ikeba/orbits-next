import { useFleetStore } from "@/stores/fleet.store";
import { useGameStore } from "@/stores/game.store";
import { useStationsStore } from "@/stores/stations.store";
import { GameScenario } from "@/types/Scenario";

export const defaultScenario: GameScenario = {
  id: "default",
  name: "Default",
  description: "Default scenario",
  setup: () => {
    useGameStore.getState().setScenario(defaultScenario);
    useFleetStore.getState().addShip({
      name: "Base Ship",
      positionId: useStationsStore.getState().stations[0].id,
    });
  },
};
