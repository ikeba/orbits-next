import { gameLoop } from "@/services/game-loop";
import { ProductionService } from "@/services/production.service";
import { GameLoopSystem } from "@/types/GameLoopSystems";
import { ProductionFacility } from "@/types/Production";
import { ResourceName } from "@/types/Resource";

import { Station } from "@/types/Station";
import { create } from "zustand";

interface StationsState {
  stations: Station[];

  getStationById: (id: string) => Station | null;
  setStations: (stations: Station[]) => void;
  setStationResources: (
    stationId: string,
    resourceName: ResourceName,
    newAmount: number
  ) => void;
  addProductionFacility: (
    stationId: string,
    facility: ProductionFacility
  ) => void;
}

export const useStationsStore = create<StationsState>()((set, get) => {
  gameLoop.addSystem(GameLoopSystem.Production, () =>
    ProductionService.updateProduction()
  );

  return {
    stations: [],

    setStations: (stations: Station[]) => {
      set({ stations });
    },

    getStationById: (id: string) => {
      return get().stations.find((station) => station.id === id) || null;
    },

    setStationResources: (
      stationId: string,
      resourceName: ResourceName,
      newAmount: number
    ) => {
      set((state) => {
        const newState = {
          stations: state.stations.map((station) =>
            station.id === stationId
              ? {
                  ...station,
                  resources: {
                    ...station.resources,
                    [resourceName]: {
                      ...station.resources[resourceName],
                      amount: newAmount,
                    },
                  },
                }
              : station
          ),
        };

        return newState;
      });
    },

    addProductionFacility: (
      stationId: string,
      facility: ProductionFacility
    ) => {
      set((state) => {
        const newState = {
          stations: state.stations.map((station) =>
            station.id === stationId
              ? {
                  ...station,
                  productionFacilities: [
                    ...station.productionFacilities,
                    facility,
                  ],
                }
              : station
          ),
        };

        return newState;
      });
    },
  };
});
