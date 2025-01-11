import { ResourceName } from "@/types/Resource";
import { Ship } from "@/types/Ship";
import { Station } from "@/types/Station";
import { useFleetStore } from "@/stores/fleet.store";
import { useStationsStore } from "@/stores/stations.store";
import { BaseResourses } from "@/entities/resource.entity";

export class TradeService {
  /**
   * Execute a trade transaction between two traders
   * Returns transaction result with success status and total cost
   */
  static executeTransaction(params: {
    fromId: string; // ID of the seller
    toId: string; // ID of the buyer
    resource: ResourceName;
    amount: number;
  }): { success: boolean; totalCost?: number; error?: string } {
    const { fromId, toId, resource, amount } = params;

    // Get traders
    const from = this.getTrader(fromId);
    const to = this.getTrader(toId);

    if (!from || !to) {
      return { success: false, error: "Invalid traders" };
    }

    // Check if trade is possible
    if (!this.canTrade({ from, to, resource, amount })) {
      return { success: false, error: "Trade validation failed" };
    }

    // Determine price
    const price = this.getPrice(from, to, resource);
    const totalCost = price * amount;

    // Выполняем обмен
    this.transferResource({
      fromId,
      toId,
      resource,
      amount,
    });

    return {
      success: true,
      totalCost,
    };
  }

  /**
   * Get price for trade operation based on trader types
   * - If seller is station, use station's sell price
   * - If buyer is station, use station's buy price
   * - For ship-to-ship trades, use base resource price
   */
  private static getPrice(
    from: Ship | Station,
    to: Ship | Station,
    resource: ResourceName
  ): number {
    // If seller is station, use its sell price
    if ("resourcePrices" in from) {
      return from.resourcePrices[resource].sellPrice;
    }

    // If buyer is station, use its buy price
    if ("resourcePrices" in to) {
      return to.resourcePrices[resource].buyPrice;
    }

    // For ship-to-ship trades, use base resource price
    return BaseResourses[resource].basePrice;
  }

  /**
   * Check if trade is possible
   */
  private static canTrade(params: {
    from: Ship | Station;
    to: Ship | Station;
    resource: ResourceName;
    amount: number;
  }): boolean {
    const { from, to, resource, amount } = params;

    // Check if seller has enough resource
    if (from.resources[resource].amount < amount) {
      return false;
    }

    // Check if buyer has enough free space
    // @todo: add cargo size to ship
    const buyerCurrentCargo = Object.values(to.resources).reduce(
      (sum, { amount }) => sum + amount,
      0
    );

    if ("cargoSize" in to && buyerCurrentCargo + amount > to.cargoSize) {
      return false;
    }

    return true;
  }

  /**
   * Transfer resources between traders
   */
  private static transferResource(params: {
    fromId: string;
    toId: string;
    resource: ResourceName;
    amount: number;
  }) {
    const { fromId, toId, resource, amount } = params;

    const from = this.getTrader(fromId);
    const to = this.getTrader(toId);

    if (!from || !to) return;

    // Update seller's resources
    this.updateTraderResource(
      fromId,
      resource,
      from.resources[resource].amount - amount
    );

    // Update buyer's resources
    this.updateTraderResource(
      toId,
      resource,
      (to.resources[resource].amount || 0) + amount
    );
  }

  /**
   * Get trader by ID
   */
  private static getTrader(id: string): Ship | Station | null {
    const ship = useFleetStore.getState().getShipById(id);
    if (ship) return ship;

    const station = useStationsStore.getState().getStationById(id);
    if (station) return station;

    return null;
  }

  /**
   * Update trader's resources
   */
  private static updateTraderResource(
    traderId: string,
    resource: ResourceName,
    newAmount: number
  ) {
    const fleetStore = useFleetStore.getState();
    const stationsStore = useStationsStore.getState();

    if (fleetStore.getShipById(traderId)) {
      fleetStore.setShipCargo(traderId, resource, newAmount);
    } else if (stationsStore.getStationById(traderId)) {
      stationsStore.setStationResources(traderId, resource, newAmount);
    }
  }
}
