import { usePlayerStore } from "@/stores/player.store";

export const usePlayerCredits = () => {
  // 🎯 Subscribe to store changes
  return usePlayerStore((state) => state.getCredits());
};
