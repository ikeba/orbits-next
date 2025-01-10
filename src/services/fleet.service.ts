import { Ship } from "@/types/Ship";

import { mainConfig } from "@/configs/main.config";
import { useFleetStore } from "@/stores/fleet.store";
import { ShipStatus } from "@/types/Ship";
import { createShipResources } from "@/entities/resource.entity";
import { getRandomId, slugify } from "@/helpers/string.helper";
import { TravelService } from "./travel.service";

export class FleetService {
  public static createShip({
    name,
    positionId,
  }: {
    name: string;
    positionId: string;
  }): Ship {
    const ship: Ship = {
      id: `ship-${slugify(name)}-${getRandomId()}`,
      name,
      status: ShipStatus.Idle,
      positionId,
      travelId: null,
      cargoSize: mainConfig.defaultCargoSize,
      resources: createShipResources(),
    };

    useFleetStore.getState().addShip(ship);

    return ship;
  }

  public static moveShip({
    shipId,
    destinationId,
  }: {
    shipId: string;
    destinationId: string;
  }): void {
    const ship = this.getShipById(shipId);
    if (!ship) return;

    const canTravel = TravelService.canTravel({
      shipStatus: ship.status,
      shipPositionId: ship.positionId,
      shipDestinationId: destinationId,
    });

    if (!canTravel) return;

    TravelService.startTravel(ship, destinationId);
  }

  public static updateShipTravel(shipId: string, travelId: string | null) {
    useFleetStore.getState().updateShipTravel(shipId, travelId);
  }

  public static completeShipTravel(shipId: string, destinationId: string) {
    useFleetStore.getState().completeShipTravel(shipId, destinationId);
  }

  public static getShipById(id: string): Ship | null {
    return useFleetStore.getState().getShipById(id);
  }
}
