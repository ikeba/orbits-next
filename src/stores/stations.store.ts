import { initialStations } from "@/_mocks/station.mock";

import { Station } from "@/types/Station";
import { create } from "zustand";

interface StationsState {
  stations: Station[];

  getStationById: (id: string) => Station | null;
}

export const useStationsStore = create<StationsState>()((set, get) => ({
  stations: initialStations,

  getStationById: (id: string) => {
    return get().stations.find((station) => station.id === id) || null;
  },
}));
