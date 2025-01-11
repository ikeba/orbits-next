import { ResourceName } from "@/types/Resource";
import { Ship } from "@/types/Ship";
import { Station } from "@/types/Station";
import { TradeType } from "@/types/Trade";

import { FleetService } from "./fleet.service";
import { StationService } from "./station.service";
import { PlayerService } from "./player.service";

const isStation = (trader: Ship | Station): trader is Station => {
  return "resourcePrices" in trader;
};

export class TradeService {
  /**
   * Execute trade transaction between two traders
   */
  static executeTransaction({
    fromId,
    toId,
    resource,
    amount,
  }: {
    fromId: string;
    toId: string;
    resource: ResourceName;
    amount: number;
  }): {
    success: boolean;
    error?: string;
    price?: number;
  } {
    // Get traders
    const from = this.getTrader(fromId);
    const to = this.getTrader(toId);

    if (!from || !to) {
      return { success: false, error: "Invalid traders" };
    }

    // Determine trade type and price
    const tradeType = this.getTradeType(from, to);
    if (!tradeType) {
      return { success: false, error: "Invalid trade type" };
    }

    const price = this.calculatePrice({
      from,
      to,
      resource,
      amount,
      tradeType,
    });

    // Check player balance for purchases
    if (
      tradeType === TradeType.Purchase &&
      !PlayerService.hasSufficientBalance(price)
    ) {
      return { success: false, error: "❌ Insufficient credits" };
    }

    // Validate resource transfer possibility using service methods
    const canTransfer = this.validateTransfer({ from, to, resource, amount });
    if (!canTransfer) {
      return { success: false, error: "Invalid transfer" };
    }

    // Process payment
    if (tradeType === TradeType.Purchase) {
      PlayerService.updateBalance(-price);
    } else if (tradeType === TradeType.Sale) {
      PlayerService.updateBalance(price);
    }

    // Execute transfer
    this.transferResources({ from, to, resource, amount });

    return { success: true, price };
  }

  /**
   * Validate if transfer is possible using service methods
   */
  private static validateTransfer({
    from,
    to,
    resource,
    amount,
  }: {
    from: Ship | Station;
    to: Ship | Station;
    resource: ResourceName;
    amount: number;
  }): boolean {
    // Check if seller has enough resources
    const fromAmount = isStation(from)
      ? StationService.getResourceAmount({ stationId: from.id, resource })
      : FleetService.getResourceAmount({ shipId: from.id, resource });

    if (fromAmount < amount) return false;

    // For ships, check cargo space
    if (!isStation(to)) {
      const ship = FleetService.getShipById(to.id);
      if (!ship) return false;

      const currentCargo = Object.values(ship.resources).reduce(
        (sum, { amount }) => sum + amount,
        0
      );

      if (currentCargo + amount > ship.cargoSize) return false;
    }

    return true;
  }

  /**
   * Transfer resources using service methods
   */
  private static transferResources({
    from,
    to,
    resource,
    amount,
  }: {
    from: Ship | Station;
    to: Ship | Station;
    resource: ResourceName;
    amount: number;
  }): void {
    // Remove from seller
    if (isStation(from)) {
      StationService.updateResource({
        stationId: from.id,
        resource,
        amount: -amount,
      });
    } else {
      FleetService.updateResource({
        shipId: from.id,
        resource,
        amount: -amount,
      });
    }

    // Add to buyer
    if (isStation(to)) {
      StationService.updateResource({
        stationId: to.id,
        resource,
        amount,
      });
    } else {
      FleetService.updateResource({
        shipId: to.id,
        resource,
        amount,
      });
    }
  }

  /**
   * Get trader (ship or station) by ID
   */
  private static getTrader(id: string): Ship | Station | null {
    return FleetService.getShipById(id) || StationService.getStationById(id);
  }

  /**
   * Determine trade type based on traders
   */
  private static getTradeType(
    from: Ship | Station,
    to: Ship | Station
  ): TradeType | null {
    if (isStation(from) && !isStation(to)) {
      return TradeType.Purchase; // Player buys from station
    }
    if (!isStation(from) && isStation(to)) {
      return TradeType.Sale; // Player sells to station
    }
    if (!isStation(from) && !isStation(to)) {
      return TradeType.Transfer; // Ship to ship transfer
    }
    return null; // Station to station trade not allowed
  }

  /**
   * Calculate trade price based on trade type
   * - Purchase (station -> ship): use station's sellPrice
   * - Sale (ship -> station): use station's buyPrice
   * - Transfer (ship -> ship): price is 0
   */
  private static calculatePrice({
    from,
    to,
    resource,
    amount,
    tradeType,
  }: {
    from: Ship | Station;
    to: Ship | Station;
    resource: ResourceName;
    amount: number;
    tradeType: TradeType;
  }): number {
    // Ship to ship transfers are free
    if (tradeType === TradeType.Transfer) return 0;

    // Find which trader is the station
    // We know one must be station because tradeType is Purchase or Sale
    const station = (isStation(from) ? from : to) as Station;

    // If station is seller (Purchase), use sellPrice
    // If station is buyer (Sale), use buyPrice
    const price =
      tradeType === TradeType.Purchase
        ? station.resourcePrices[resource].sellPrice // Station sells to player
        : station.resourcePrices[resource].buyPrice; // Station buys from player

    return price * amount;
  }
}
