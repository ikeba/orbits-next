import { ResourceName } from "@/types/Resource";
import { Ship } from "@/types/Ship";
import { Station } from "@/types/Station";
import { TradeType } from "@/types/Trade";
import { useFleetStore } from "@/stores/fleet.store";
import { useStationsStore } from "@/stores/stations.store";
import { BaseResourses } from "@/entities/resource.entity";
import { PlayerService } from "@/services/player.service";

const isStation = (trader: Ship | Station): trader is Station => {
  return "resourcePrices" in trader;
};

export class TradeService {
  /**
   * Determine transaction type based on participants
   */
  private static determineTransactionType(
    from: Ship | Station,
    to: Ship | Station
  ): TradeType {
    const isFromStation = from.hasOwnProperty("resourcePrices");
    const isToStation = to.hasOwnProperty("resourcePrices");

    if (isFromStation && !isToStation) return TradeType.Purchase;
    if (!isFromStation && isToStation) return TradeType.Sale;
    return TradeType.Transfer;
  }

  /**
   * Execute a trade transaction between two traders
   * Returns transaction result with success status and total cost
   */
  static executeTransaction(params: {
    fromId: string;
    toId: string;
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

    // Calculate total cost
    const price = this.getPrice(from, to, resource);
    const totalCost = price * amount;

    // Handle credits based on transaction type
    const transactionType = this.determineTransactionType(from, to);

    switch (transactionType) {
      case TradeType.Purchase:
        // Player is buying from station
        if (!PlayerService.hasSufficientBalance(-totalCost)) {
          return { success: false, error: "❌ Insufficient credits" };
        }
        PlayerService.updateBalance(-totalCost);
        break;

      case TradeType.Sale:
        // Player is selling to station
        PlayerService.updateBalance(totalCost);
        break;
    }

    // Execute the resource transfer with actual traders
    this.transferResource({
      from,
      to,
      resource,
      amount,
    });

    return {
      success: true,
      totalCost,
    };
  }

  /**
   * Get price for trade operation based on transaction type
   */
  private static getPrice(
    from: Ship | Station,
    to: Ship | Station,
    resource: ResourceName
  ): number {
    const transactionType = this.determineTransactionType(from, to);

    switch (transactionType) {
      case TradeType.Purchase:
        // Player buying from station
        return (from as Station).resourcePrices[resource].sellPrice;

      case TradeType.Sale:
        // Player selling to station
        return (to as Station).resourcePrices[resource].buyPrice;

      case TradeType.Transfer:
        // Ship to ship trades use base price
        return BaseResourses[resource].basePrice;
    }
  }

  /**
   * Check if trade is possible, based on resource availability and cargo size
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
    from: Ship | Station;
    to: Ship | Station;
    resource: ResourceName;
    amount: number;
  }): void {
    const { from, to, resource, amount } = params;

    // Update resources using type guard
    if (isStation(from)) {
      useStationsStore
        .getState()
        .setStationResources(
          from.id,
          resource,
          from.resources[resource].amount - amount
        );
    } else {
      useFleetStore
        .getState()
        .setShipCargo(
          from.id,
          resource,
          from.resources[resource].amount - amount
        );
    }

    if (isStation(to)) {
      useStationsStore
        .getState()
        .setStationResources(
          to.id,
          resource,
          to.resources[resource].amount + amount
        );
    } else {
      useFleetStore
        .getState()
        .setShipCargo(to.id, resource, to.resources[resource].amount + amount);
    }
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
}
