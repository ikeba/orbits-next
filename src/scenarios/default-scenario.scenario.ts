import { FleetService } from "@/services/fleet.service";
import { useGameStore } from "@/stores/game.store";
import { useStationsStore } from "@/stores/stations.store";
import { GameScenario } from "@/types/Scenario";

export const defaultScenario: GameScenario = {
  id: "default",
  name: "Default",
  description: "Default scenario",
  setup: () => {
    useGameStore.getState().setScenario(defaultScenario);
    // 1. Fill stations with base resources
    // @todo: Add stations

    // 2. Add base ship
    FleetService.createShip({
      name: "Base Ship",
      positionId: useStationsStore.getState().stations[0].id,
    });
  },
};
