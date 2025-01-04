import { create } from "zustand";
import { Ship, ShipStatus } from "@/types/Ship";

interface FleetStore {
  ships: Ship[];
  selectedShipId: string | null;

  addShip: ({
    name,
    stationId,
  }: {
    name: string;
    stationId: string | null;
  }) => Ship;
  selectShip: (id: string) => void;
  getSelectedShip: () => Ship | null;
}

export const useFleetStore = create<FleetStore>((set, get) => ({
  ships: [],
  selectedShipId: null,

  addShip: ({
    name,
    stationId = null,
  }: {
    name: string;
    stationId: string | null;
  }) => {
    const ship: Ship = {
      id: `ship-${Date.now()}`,
      name,
      status: ShipStatus.Idle,
      stationId,
    };

    set((state) => ({ ...state, ships: [...state.ships, ship] }));

    return ship;
  },

  selectShip: (id: string) => {
    set((state) => ({ ...state, selectedShipId: id }));
  },

  getSelectedShip: () => {
    return get().ships.find((ship) => ship.id === get().selectedShipId) || null;
  },
}));
