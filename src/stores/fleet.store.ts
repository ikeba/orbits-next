import { create } from "zustand";
import { Ship, ShipStatus } from "@/types/Ship";

interface FleetStore {
  ships: Ship[];
  selectedShipId: string | null;

  addShip: ({
    name,
    positionId,
  }: {
    name: string;
    positionId: string | null;
  }) => Ship;
  selectShip: (id: string) => void;
  getSelectedShip: () => Ship | null;
  updateShipPosition: (shipId: string, positionId: string | null) => void;
  updateShipStatus: (shipId: string, status: ShipStatus) => void;
}

export const useFleetStore = create<FleetStore>((set, get) => ({
  ships: [],
  selectedShipId: null,

  addShip: ({
    name,
    positionId = null,
  }: {
    name: string;
    positionId: string | null;
  }) => {
    const ship: Ship = {
      id: `ship-${Date.now()}`,
      name,
      status: ShipStatus.Idle,
      positionId,
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

  updateShipStatus: (shipId: string, status: ShipStatus) => {
    set((state) => ({
      ...state,
      ships: state.ships.map((ship) =>
        ship.id === shipId ? { ...ship, status } : ship
      ),
    }));
  },

  updateShipPosition: (shipId: string, positionId: string | null) => {
    set((state) => ({
      ...state,
      ships: state.ships.map((ship) =>
        ship.id === shipId ? { ...ship, positionId } : ship
      ),
    }));
  },
}));
