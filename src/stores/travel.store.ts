import { gameLoop } from "@/services/game-loop";
import { Travel, TravelStatus } from "@/types/Travel";
import { create } from "zustand";
import { TravelService } from "@/services/travel.service";
import { GameLoopSystem } from "@/types/GameLoopSystems";

interface TravelState {
  travels: Travel[];
  archivedTravels: Travel[];

  addTravel: (travel: Travel) => void;
  setTravelArchive: (travelId: string) => void;
  setTravelStatus: (travelId: string, status: TravelStatus) => void;
  batchUpdateTravels: (updatedTravels: Travel[]) => void;
  getTravelById: (travelId: string) => Travel | null;
}

export const useTravelStore = create<TravelState>()((set, get) => {
  gameLoop.addSystem(GameLoopSystem.Travel, () =>
    TravelService.updateTravels()
  );

  return {
    travels: [],
    archivedTravels: [],

    addTravel: (travel: Travel) => {
      set((state) => ({
        travels: [...state.travels, travel],
      }));
    },

    setTravelArchive: (travelId: string) => {
      const travel = get().travels.find((t) => t.id === travelId);
      if (!travel) return;

      set((state) => ({
        travels: state.travels.filter((t) => t.id !== travelId),
        archivedTravels: [...state.archivedTravels, travel],
      }));
    },

    setTravelStatus: (travelId: string, status: TravelStatus) => {
      set((state) => ({
        travels: state.travels.map((t) =>
          t.id === travelId ? { ...t, status } : t
        ),
      }));
    },

    getTravelById: (travelId: string) => {
      return get().travels.find((t) => t.id === travelId) || null;
    },

    batchUpdateTravels: (updatedTravels: Travel[]) => {
      set((state) => ({
        travels: state.travels.map((travel) => {
          const updated = updatedTravels.find((t) => t.id === travel.id);
          return updated || travel;
        }),
      }));
    },
  };
});
