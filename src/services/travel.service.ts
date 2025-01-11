import { Ship, ShipStatus } from "@/types/Ship";
import { Travel, TravelStatus } from "@/types/Travel";

import { useTravelStore } from "@/stores/travel.store";

import { FleetService } from "./fleet.service";
import { GAME_CONFIG } from "@/configs/game.config";

export class TravelService {
  /**
   * Function to be used in game loop to update travel progress
   */
  static updateTravels() {
    const { travels } = useTravelStore.getState();

    if (travels.length === 0) return;

    const updatedTravels: Travel[] = [];

    travels.forEach((travel) => {
      if (travel.status === TravelStatus.Pending) {
        this.startTravelProgress(travel);
        updatedTravels.push({ ...travel, status: TravelStatus.InProgress });
        return;
      }

      if (travel.status === TravelStatus.InProgress) {
        // use real time instead of delta
        const currentTime = Date.now();
        const elapsedSeconds = (currentTime - travel.startTime) / 1000;

        // Calculate the covered distance based on time
        const coveredDistance = Math.min(
          travel.distance,
          travel.speed * elapsedSeconds
        );

        // Update only if the change is significant (greater than 1%)
        if (
          Math.abs(coveredDistance - travel.coveredDistance) >
          travel.distance * 0.01
        ) {
          updatedTravels.push({ ...travel, coveredDistance });
        }

        // Проверяем завершение
        if (coveredDistance >= travel.distance) {
          this.completeTravel(travel);
        }
      }
    });

    if (updatedTravels.length > 0) {
      const travelStore = useTravelStore.getState();
      travelStore.batchUpdateTravels(updatedTravels);
    }
  }

  /**
   * Function to start travel. Creates travel entity and adds it to the store.
   * @param ship - Ship to start travel
   * @param targetId - Target id to travel to
   */
  public static startTravel(ship: Ship, targetId: string) {
    const travel = this.createTravelEntity({
      shipId: ship.id,
      fromId: ship.positionId!,
      toId: targetId,
    });

    useTravelStore.getState().addTravel(travel);
  }

  public static getTravelProgress(travel: Travel | undefined): number {
    if (!travel) return 0;
    return Math.round((travel.coveredDistance / travel.distance) * 100);
  }

  public static canTravel({
    shipStatus,
    shipPositionId,
    shipDestinationId,
  }: {
    shipStatus: ShipStatus;
    shipPositionId: string | null;
    shipDestinationId: string | null;
  }): boolean {
    return (
      shipStatus === ShipStatus.Idle &&
      shipPositionId !== null &&
      shipDestinationId !== null &&
      shipDestinationId !== shipPositionId
    );
  }

  // Private methods

  private static createTravelEntity({
    shipId,
    fromId,
    toId,
  }: {
    shipId: string;
    fromId: string;
    toId: string;
  }): Travel {
    return {
      id: `travel_${shipId}_${toId}_${Date.now()}`,
      shipId,
      fromId,
      toId,
      status: TravelStatus.Pending,
      startTime: Date.now(),
      coveredDistance: 0,
      distance: GAME_CONFIG.travel.defaultDistance,
      speed: GAME_CONFIG.travel.defaultSpeed,
    };
  }

  /**
   * Function to update ship travel status in the fleet store.
   * @param travel - Travel to update
   */
  private static startTravelProgress(travel: Travel) {
    FleetService.updateShipTravel(travel.shipId, travel.id);
  }

  /**
   * Function to complete travel in the fleet store and travel store.
   * Updates ship status and removes travel from the list of the active travels.
   * @param travel - Travel to complete
   */
  private static completeTravel(travel: Travel) {
    FleetService.completeShipTravel(travel.shipId, travel.toId);
    useTravelStore.getState().setTravelArchive(travel.id);
  }
}
