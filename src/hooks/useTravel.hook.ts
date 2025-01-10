import { TravelService } from "@/services/travel.service";
import { useTravelStore } from "@/stores/travel.store";

export const useTravel = (shipId: string) => {
  // Получаем данные из стора
  const travel = useTravelStore((state) =>
    state.travels.find((t) => t.shipId === shipId)
  );

  // Просто вычисляем прогресс
  const progress = TravelService.getTravelProgressByShipId(shipId);

  return { travel, progress };
};
