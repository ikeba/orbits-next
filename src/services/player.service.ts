import { usePlayerStore } from "@/stores/player.store";
import { Player } from "@/types/Player";
import { getRandomId } from "@/helpers/string.helper";

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
   * Check if player has sufficient balance for transaction
   * @param amount - Positive for receiving credits, negative for spending
   */
  static hasSufficientBalance(amount: number): boolean {
    const currentCredits = this.getCredits();
    return currentCredits + amount >= 0;
  }

  /**
   * Update player's credit balance
   * @param amount - Positive for receiving credits, negative for spending
   */
  static updateBalance(amount: number): boolean {
    if (!this.hasSufficientBalance(amount)) {
      return false;
    }

    usePlayerStore.getState().updateCredits(amount);
    return true;
  }
}
