import { Travel } from "@/types/Travel";

import { useFleetStore } from "@/stores/fleet.store";
import { useTravelStore } from "@/stores/travel.store";
import { Ship, ShipStatus } from "@/types/Ship";
import { TravelStatus } from "@/types/Travel";
import { mainConfig } from "@/configs/main.config";

export class TravelService {
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

  public static startTravel(ship: Ship, targetId: string) {
    const travel = this.createTravelEntity({
      shipId: ship.id,
      fromId: ship.positionId!,
      toId: targetId,
    });

    useTravelStore.getState().addTravel(travel);
  }

  public static getTravelProgressByShipId(shipId: string): number {
    const travel = useTravelStore
      .getState()
      .travels.find((travel) => travel.shipId === shipId);
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
      distance: mainConfig.defaultTravelDistance,
      speed: mainConfig.defaultTravelSpeed,
    };
  }

  private static startTravelProgress(travel: Travel) {
    const fleetStore = useFleetStore.getState();

    fleetStore.setShipPosition(travel.shipId, null);
    fleetStore.setShipStatus(travel.shipId, ShipStatus.Moving);
    fleetStore.setShipTravelId(travel.shipId, travel.id);

    // console.log(
    //   `Travel ${travel.id} started at ${new Date().toLocaleTimeString()}`
    // );
  }

  private static completeTravel(travel: Travel) {
    const fleetStore = useFleetStore.getState();
    const travelStore = useTravelStore.getState();

    fleetStore.setShipPosition(travel.shipId, travel.toId);
    fleetStore.setShipStatus(travel.shipId, ShipStatus.Idle);
    fleetStore.setShipTravelId(travel.shipId, null);

    travelStore.setTravelArchive(travel.id);

    // console.log(
    //   `Travel ${travel.id} completed at ${new Date().toLocaleTimeString()}`
    // );
  }
}
