import { gameLoop } from "@/services/game-loop";
import { Travel, TravelStatus } from "@/types/Travel";
import { create } from "zustand";

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
  status: TravelStatus.InProgress,
  startTime: Date.now(),
  distance,
  coveredDistance: 0,
  speed,
});

interface TravelState {
  travels: Travel[];
  archivedTravels: Travel[];

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
  const travelSystem = (delta: number) => {
    const { travels } = get();

    travels.forEach((travel) => {
      if (travel.status === TravelStatus.InProgress) {
        travel.coveredDistance += travel.speed * delta;
        console.log(
          `Travel ${travel.id} covered ${travel.coveredDistance} of ${travel.distance}`
        );
      }

      if (travel.coveredDistance >= travel.distance) {
        travel.status = TravelStatus.Completed;
        console.log(`Travel ${travel.id} completed`);
        set((state) => ({
          travels: state.travels.filter((t) => t.id !== travel.id),
          archivedTravels: [...state.archivedTravels, travel],
        }));
      }
    });
  };

  gameLoop.addSystem(travelSystem);

  return {
    travels: [],
    archivedTravels: [],

    addTravel: ({ shipId, fromId, toId, speed }) => {
      const DISTANCE = 10;

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
  };
});
