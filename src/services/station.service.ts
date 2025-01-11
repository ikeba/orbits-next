import { Station } from "@/types/Station";
import { ResourceName } from "@/types/Resource";
import { ResourceService } from "@/services/resource.service";
import { getRandomId } from "@/helpers/string.helper";

import { useStationsStore } from "@/stores/stations.store";
import { BASE_STATIONS_CONFIG } from "@/configs/stations.config";

export class StationService {
  /**
   * Initialize base stations in the store
   */
  static initializeBaseStations(): void {
    const baseStations = BASE_STATIONS_CONFIG.map((config) =>
      this.createStation(config)
    );

    useStationsStore.getState().setStations(baseStations);
  }

  /**
   * Get station by ID
   * Returns null if station doesn't exist
   */
  static getStationById(id: string): Station | null {
    return useStationsStore.getState().getStationById(id);
  }

  /**
   * Get all stations
   */
  static getAllStations(): Station[] {
    return useStationsStore.getState().stations;
  }

  /**
   * Get station's resource amount
   */
  static getResourceAmount({
    stationId,
    resource,
  }: {
    stationId: string;
    resource: ResourceName;
  }): number {
    const station = this.getStationById(stationId);
    return station?.resources[resource].amount || 0;
  }

  /**
   * Update station's resource amount
   * Returns false if:
   * - Station doesn't exist
   * - Amount would be negative
   */
  static updateResource({
    stationId,
    resource,
    amount,
  }: {
    stationId: string;
    resource: ResourceName;
    amount: number;
  }): boolean {
    const station = this.getStationById(stationId);
    if (!station) return false;

    const currentAmount = station.resources[resource].amount;
    const newAmount = currentAmount + amount;

    if (newAmount < 0) return false;

    useStationsStore
      .getState()
      .setStationResources(stationId, resource, newAmount);

    return true;
  }

  /**
   * Set exact resource amount for station
   */
  static setExactResourceAmount({
    stationId,
    resource,
    amount,
  }: {
    stationId: string;
    resource: ResourceName;
    amount: number;
  }): boolean {
    const station = this.getStationById(stationId);
    if (!station) return false;

    if (amount < 0) return false;

    useStationsStore
      .getState()
      .setStationResources(stationId, resource, amount);

    return true;
  }

  /**
   * Get all resources for station
   */
  static getResources(stationId: string): Record<ResourceName, number> {
    const station = this.getStationById(stationId);
    if (!station) return {} as Record<ResourceName, number>;

    return Object.entries(station.resources).reduce(
      (acc, [resource, { amount }]) => ({
        ...acc,
        [resource]: amount,
      }),
      {} as Record<ResourceName, number>
    );
  }

  static createStation({
    name,
    type,
  }: Pick<Station, "name" | "type">): Station {
    return {
      id: `station_${name.toLowerCase().replace(/\s+/g, "-")}_${getRandomId()}`,
      name,
      type,
      resources: ResourceService.createStationResources(),
      resourcePrices: ResourceService.createStationPrices({ type }),
    };
  }
}
