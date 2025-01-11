import { create } from "zustand";
import { Player } from "@/types/Player";

interface PlayerState {
  player: Player | null;

  // Actions
  setPlayer: (player: Player) => void;
  updateCredits: (amount: number) => void;

  // Getters
  getCredits: () => number;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  player: null,

  setPlayer: (player: Player) => {
    set({ player });
  },

  updateCredits: (amount: number) => {
    set((state) => ({
      player: state.player
        ? { ...state.player, credits: state.player.credits + amount }
        : null,
    }));
  },

  getCredits: () => get().player?.credits ?? 0,
}));
