import { BaseStations } from "@/entities/station.entity";
import { ResourceName } from "@/types/Resource";

import { Station } from "@/types/Station";
import { create } from "zustand";

interface StationsState {
  stations: Station[];

  getStationById: (id: string) => Station | null;
  setStationResources: (
    stationId: string,
    resourceName: ResourceName,
    newAmount: number
  ) => void;
}

export const useStationsStore = create<StationsState>()((set, get) => ({
  stations: BaseStations,

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
}));
