import { Ship } from "@/types/Ship";
import { ResourceName } from "@/types/Resource";
import { ShipStatus } from "@/types/Ship";
import { getRandomId, slugify } from "@/helpers/string.helper";
import { GAME_CONFIG } from "@/configs/game.config";

import { TravelService } from "./travel.service";
import { ResourceService } from "./resource.service";

import { useFleetStore } from "@/stores/fleet.store";

export class FleetService {
  /**
   * Get ship by ID
   * Returns null if ship doesn't exist
   */
  static getShipById(id: string): Ship | null {
    return useFleetStore.getState().getShipById(id);
  }

  /**
   * Get all ships
   */
  static getAllShips(): Ship[] {
    return useFleetStore.getState().ships;
  }

  /**
   * Get ship's resource amount
   */
  static getResourceAmount({
    shipId,
    resource,
  }: {
    shipId: string;
    resource: ResourceName;
  }): number {
    const ship = this.getShipById(shipId);
    return ship?.resources[resource].amount || 0;
  }

  /**
   * Update ship's resource amount
   * Returns false if:
   * - Ship doesn't exist
   * - Amount would be negative
   * - Not enough cargo space
   */
  static updateResource({
    shipId,
    resource,
    amount,
  }: {
    shipId: string;
    resource: ResourceName;
    amount: number;
  }): boolean {
    const ship = this.getShipById(shipId);
    if (!ship) return false;

    const currentAmount = ship.resources[resource].amount;
    const newAmount = currentAmount + amount;

    if (newAmount < 0) return false;

    // Check cargo space
    const currentCargo = Object.values(ship.resources).reduce(
      (sum, { amount }) => sum + amount,
      0
    );
    if (currentCargo + amount > ship.cargoSize) return false;

    useFleetStore.getState().setShipCargo(shipId, resource, newAmount);

    return true;
  }

  /**
   * Set exact resource amount for ship
   */
  static setExactResourceAmount({
    shipId,
    resource,
    amount,
  }: {
    shipId: string;
    resource: ResourceName;
    amount: number;
  }): boolean {
    const ship = this.getShipById(shipId);
    if (!ship) return false;

    if (amount < 0) return false;

    useFleetStore.getState().setShipCargo(shipId, resource, amount);

    return true;
  }

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
      cargoSize: GAME_CONFIG.ship.defaultCargoSize,
      resources: ResourceService.createShipResources(),
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
}
