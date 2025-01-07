import { gameLoop } from "@/services/game-loop";
import { Travel, TravelStatus } from "@/types/Travel";
import { create } from "zustand";
import { TravelService } from "@/services/travel.service";
import { GameLoopSystem } from "@/types/GameLoopSystems";

const createTravel = ({
  shipId,
  fromId,
  toId,
  speed,
  distance,
}: {
  shipId: string;
  fromId: string;
  toId: string;
  speed: number;
  distance: number;
}) => ({
  id: `travel-${shipId}-${fromId}-${toId}-${Date.now()}`,
  shipId,
  fromId,
  toId,
  status: TravelStatus.Pending,
  startTime: Date.now(),
  distance,
  coveredDistance: 0,
  speed,
});

interface TravelState {
  travels: Travel[];
  archivedTravels: Travel[];

  archiveTravel: (travelId: string) => void;
  setTravelStatus: (travelId: string, status: TravelStatus) => void;
  batchUpdateTravels: (updatedTravels: Travel[]) => void;
  addTravel: ({
    shipId,
    fromId,
    toId,
    speed,
  }: {
    shipId: string;
    fromId: string;
    toId: string;
    speed: number;
  }) => void;
}

export const useTravelStore = create<TravelState>()((set, get) => {
  gameLoop.addSystem(GameLoopSystem.Travel, () =>
    TravelService.updateTravels()
  );

  return {
    travels: [],
    archivedTravels: [],

    addTravel: ({ shipId, fromId, toId, speed }) => {
      const DISTANCE = 5;

      const newTravel = createTravel({
        shipId,
        fromId,
        toId,
        speed,
        distance: DISTANCE,
      });

      set((state) => ({
        travels: [...state.travels, newTravel],
      }));
    },

    archiveTravel: (travelId: string) => {
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
