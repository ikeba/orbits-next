import { FleetService } from "@/services/fleet.service";
import { PlayerService } from "@/services/player.service";
import { useGameStore } from "@/stores/game.store";
import { useStationsStore } from "@/stores/stations.store";
import { GameScenario } from "@/types/Scenario";
import { GAME_CONFIG } from "@/configs/game.config";
import { StationService } from "@/services/station.service";

export const defaultScenario: GameScenario = {
  id: "default",
  name: "Default",
  description: "Default scenario",
  setup: async () => {
    useGameStore.getState().setScenario(defaultScenario);

    // 1. Initialize base stations
    StationService.initializeBaseStations();

    // 2. Create player
    PlayerService.createPlayer({
      name: "Player",
      credits: GAME_CONFIG.starting.playerCredits,
    });

    // 3. Create player's ship
    FleetService.createShip({
      name: GAME_CONFIG.starting.shipName,
      positionId: useStationsStore.getState().stations[0].id,
    });
  },
};
