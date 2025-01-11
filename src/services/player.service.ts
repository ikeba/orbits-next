import { Player } from "@/types/Player";
import { getRandomId } from "@/helpers/string.helper";

import { usePlayerStore } from "@/stores/player.store";

export class PlayerService {
  /**
   * Create a new player with initial settings
   */
  static createPlayer({
    name,
    credits,
  }: {
    name: string;
    credits: number;
  }): Player {
    const player: Player = {
      id: `player_${getRandomId()}`,
      name,
      shipIds: [],
      credits,
    };

    usePlayerStore.getState().setPlayer(player);
    return player;
  }

  /**
   * Get current player's credits
   */
  static getCredits(): number {
    return usePlayerStore.getState().getCredits();
  }

  /**
   * Check if player has sufficient balance for spending
   */
  static hasSufficientBalance(amount: number): boolean {
    const currentCredits = this.getCredits();
    return currentCredits >= amount;
  }

  /**
   * Update player's credit balance
   * Returns false if trying to spend more than available
   */
  static updateBalance(amount: number): boolean {
    // For spending, check if we have enough
    if (amount < 0 && !this.hasSufficientBalance(Math.abs(amount))) {
      return false;
    }

    usePlayerStore.getState().updateCredits(amount);
    return true;
  }
}
