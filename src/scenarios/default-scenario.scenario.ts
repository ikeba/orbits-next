import { FleetService } from "@/services/fleet.service";
import { PlayerService } from "@/services/player.service";
import { useGameStore } from "@/stores/game.store";
import { useStationsStore } from "@/stores/stations.store";
import { GameScenario } from "@/types/Scenario";
import { GAME_CONFIG } from "@/configs/game.config";

export const defaultScenario: GameScenario = {
  id: "default",
  name: "Default",
  description: "Default scenario",
  setup: () => {
    useGameStore.getState().setScenario(defaultScenario);

    PlayerService.createPlayer({
      name: "Player",
      credits: GAME_CONFIG.starting.playerCredits,
    });

    FleetService.createShip({
      name: GAME_CONFIG.starting.shipName,
      positionId: useStationsStore.getState().stations[0].id,
    });
  },
};
