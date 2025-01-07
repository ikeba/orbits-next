import { Travel } from "@/types/Travel";

import { useFleetStore } from "@/stores/fleet.store";
import { useTravelStore } from "@/stores/travel.store";
import { ShipStatus } from "@/types/Ship";
import { TravelStatus } from "@/types/Travel";

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

  private static startTravelProgress(travel: Travel) {
    const fleetStore = useFleetStore.getState();

    fleetStore.setShipPosition(travel.shipId, null);
    fleetStore.setShipStatus(travel.shipId, ShipStatus.Moving);
    fleetStore.setShipTravelId(travel.shipId, travel.id);

    console.log(
      `Travel ${travel.id} started at ${new Date().toLocaleTimeString()}`
    );
  }

  private static completeTravel(travel: Travel) {
    const fleetStore = useFleetStore.getState();
    const travelStore = useTravelStore.getState();

    fleetStore.setShipPosition(travel.shipId, travel.toId);
    fleetStore.setShipStatus(travel.shipId, ShipStatus.Idle);
    fleetStore.setShipTravelId(travel.shipId, null);

    travelStore.archiveTravel(travel.id);

    console.log(
      `Travel ${travel.id} completed at ${new Date().toLocaleTimeString()}`
    );
  }
}
