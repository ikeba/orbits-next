import {
  ProductionFacility,
  ProductionStatus,
  ProductionFacilityName,
  ProductionFacilityInfo,
} from "@/types/Production";
import { ResourceName } from "@/types/Resource";
import { PRODUCTION_FACILITY_CONFIG } from "@/configs/production.config";
import { StationService } from "./station.service";
import { getRandomId } from "@/helpers/string.helper";
import { calculateTimeProgress } from "@/helpers/time.helper";

export class ProductionService {
  /**
   * Get all available facilities info
   */
  static getAvailableFacilities(): Record<
    ProductionFacilityName,
    ProductionFacilityInfo
  > {
    return PRODUCTION_FACILITY_CONFIG;
  }

  /**
   * Get specific facility info
   */
  static getFacilityInfo(name: ProductionFacilityName): ProductionFacilityInfo {
    return PRODUCTION_FACILITY_CONFIG[name];
  }

  /**
   * Create new production facility instance
   */
  static createFacility(name: ProductionFacilityName): ProductionFacility {
    const info = this.getFacilityInfo(name);

    return {
      id: `facility_${name}_${getRandomId()}`,
      name,
      type: info.type,
      recipe: { ...info.recipe }, // Clone recipe to avoid reference issues
      progress: 0,
      startTime: null,
      status: ProductionStatus.Idle,
    };
  }

  /**
   * Check if production can start (enough resources)
   */
  static canStartProduction(stationId: string, facilityId: string): boolean {
    const station = StationService.getStationById(stationId);
    if (!station) {
      console.warn("Station not found");
      return false;
    }

    const facility = station.productionFacilities.find(
      (f) => f.id === facilityId
    );
    if (!facility) {
      console.warn("Facility not found");
      return false;
    }

    // If already running, can't start again
    if (facility.status === ProductionStatus.InProgress) {
      console.warn("Facility already running");
      return false;
    }

    // If no input required (e.g. solar panel), always can start
    if (
      !facility.recipe.input ||
      Object.keys(facility.recipe.input).length === 0
    ) {
      return true;
    }

    // Check if we have all required input resources
    const hasResources = Object.entries(facility.recipe.input).every(
      ([resource, amount]) => {
        const available = StationService.getResourceAmount({
          stationId,
          resource: resource as ResourceName,
        });
        const hasEnough = available >= amount;
        if (!hasEnough) {
          console.warn(
            `Not enough ${resource}: need ${amount}, have ${available}`
          );
        }
        return hasEnough;
      }
    );

    return hasResources;
  }

  /**
   * Start production cycle
   */
  static startProduction(stationId: string, facilityId: string): boolean {
    if (!this.canStartProduction(stationId, facilityId)) return false;

    const station = StationService.getStationById(stationId);
    if (!station) return false;

    const facility = station.productionFacilities.find(
      (f) => f.id === facilityId
    );
    if (!facility) return false;

    // Consume input resources if any
    if (
      facility.recipe.input &&
      Object.keys(facility.recipe.input).length > 0
    ) {
      Object.entries(facility.recipe.input).forEach(([resource, amount]) => {
        StationService.updateResource({
          stationId,
          resource: resource as ResourceName,
          amount: -amount,
        });
      });
    }

    // Set progress to 0 and start time
    facility.progress = 0;
    facility.startTime = Date.now();
    facility.status = ProductionStatus.InProgress;

    return true;
  }

  /**
   * Update production progress
   * Should be called from game loop
   */
  static updateProduction(): void {
    const stations = StationService.getAllStations();

    stations.forEach((station) => {
      station.productionFacilities.forEach((facility) => {
        // Try to start production if idle
        if (facility.status === ProductionStatus.Idle) {
          // If can start - start it! 🚀
          if (this.canStartProduction(station.id, facility.id)) {
            this.startProduction(station.id, facility.id);
            return;
          }
          return; // Skip if can't start (not enough resources)
        }

        // Skip if not in progress or no start time
        if (
          facility.status !== ProductionStatus.InProgress ||
          !facility.startTime
        ) {
          return;
        }

        const progress = calculateTimeProgress(
          facility.startTime,
          facility.recipe.cycleTime
        );

        // Update only if progress changed significantly (1%)
        if (Math.abs(progress - facility.progress) > 0.01) {
          facility.progress = progress;
        }

        // Complete production if reached 100%
        if (progress >= 1) {
          this.completeProduction(station.id, facility.id);
          // After completion, immediately try to start next cycle
          if (this.canStartProduction(station.id, facility.id)) {
            this.startProduction(station.id, facility.id);
          }
        }
      });
    });
  }

  /**
   * Complete production cycle and add output resources
   */
  private static completeProduction(
    stationId: string,
    facilityId: string
  ): void {
    const station = StationService.getStationById(stationId);
    if (!station) return;

    const facility = station.productionFacilities.find(
      (f) => f.id === facilityId
    );
    if (!facility) return;

    // Add output resources if they exist
    if (facility.recipe.output) {
      Object.entries(facility.recipe.output).forEach(([resource, amount]) => {
        StationService.updateResource({
          stationId,
          resource: resource as ResourceName,
          amount,
        });
        console.log(`Added ${amount} ${resource} to station ${stationId}`);
      });
    }

    // Reset progress and start time
    facility.progress = 0;
    facility.startTime = null;
    facility.status = ProductionStatus.Idle;

    console.log(
      `Completed production for facility ${facilityId} in station ${stationId}`
    );
  }
}
