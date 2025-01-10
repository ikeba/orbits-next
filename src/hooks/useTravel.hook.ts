import { TravelService } from "@/services/travel.service";
import { useTravelStore } from "@/stores/travel.store";

export const useTravel = (shipId: string) => {
  const travel = useTravelStore((state) =>
    state.travels.find((t) => t.shipId === shipId)
  );

  const progress = TravelService.getTravelProgress(travel);

  return { travel, progress };
};
