import { create } from "zustand";
import { Ship, ShipStatus } from "@/types/Ship";

interface FleetStore {
  ships: Ship[];
  selectedShipId: string | null;

  addShip: (name: string) => Ship;
  selectShip: (id: string) => void;
  getSelectedShip: () => Ship | null;
}

export const useFleetStore = create<FleetStore>((set, get) => ({
  ships: [],
  selectedShipId: null,

  addShip: (name: string) => {
    const ship: Ship = {
      id: `ship-${Date.now()}`,
      name,
      status: ShipStatus.Idle,
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
