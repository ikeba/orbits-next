import { create } from "zustand";
import { Ship, ShipStatus } from "@/types/Ship";
import { ResourceName } from "@/types/Resource";

interface FleetStore {
  ships: Ship[];
  selectedShipId: string | null;

  // UI methods
  selectShip: (id: string) => void;
  getSelectedShip: () => Ship | null;

  // Setters
  addShip: (ship: Ship) => Ship;
  setShipPosition: (shipId: string, positionId: string | null) => void;
  setShipStatus: (shipId: string, status: ShipStatus) => void;
  setShipTravelId: (shipId: string, travelId: string | null) => void;
  setShipCargo: (
    shipId: Ship["id"],
    resourceName: ResourceName,
    newAmount: number
  ) => void;
  updateShipTravel: (shipId: string, travelId: string | null) => void;
  completeShipTravel: (shipId: string, destinationId: string) => void;

  // Getters
  getShipById: (id: string) => Ship | null;
}

export const useFleetStore = create<FleetStore>((set, get) => ({
  ships: [],
  selectedShipId: null,

  addShip: (ship: Ship) => {
    set((state) => ({ ...state, ships: [...state.ships, ship] }));

    return ship;
  },

  selectShip: (id: string) => {
    set((state) => ({ ...state, selectedShipId: id }));
  },

  getSelectedShip: () => {
    return get().ships.find((ship) => ship.id === get().selectedShipId) || null;
  },

  getShipById: (id: string) => {
    return get().ships.find((ship) => ship.id === id) || null;
  },

  setShipStatus: (shipId: string, status: ShipStatus) => {
    set((state) => ({
      ...state,
      ships: state.ships.map((ship) =>
        ship.id === shipId ? { ...ship, status } : ship
      ),
    }));
  },

  setShipPosition: (shipId: string, positionId: string | null) => {
    set((state) => ({
      ...state,
      ships: state.ships.map((ship) =>
        ship.id === shipId ? { ...ship, positionId } : ship
      ),
    }));
  },

  setShipTravelId: (shipId: string, travelId: string | null) => {
    set((state) => ({
      ...state,
      ships: state.ships.map((ship) =>
        ship.id === shipId ? { ...ship, travelId } : ship
      ),
    }));
  },

  setShipCargo: (
    shipId: Ship["id"],
    resourceName: ResourceName,
    newAmount: number
  ) => {
    set((state) => ({
      ...state,
      ships: state.ships.map((ship) =>
        ship.id === shipId
          ? {
              ...ship,
              resources: {
                ...ship.resources,
                [resourceName]: { amount: newAmount },
              },
            }
          : ship
      ),
    }));
  },

  updateShipTravel: (shipId: string, travelId: string | null) => {
    set((state) => ({
      ships: state.ships.map((ship) =>
        ship.id === shipId
          ? {
              ...ship,
              status: travelId ? ShipStatus.Moving : ShipStatus.Idle,
              positionId: travelId ? null : ship.positionId,
              travelId,
            }
          : ship
      ),
    }));
  },

  completeShipTravel: (shipId: string, destinationId: string) => {
    set((state) => ({
      ships: state.ships.map((ship) =>
        ship.id === shipId
          ? {
              ...ship,
              status: ShipStatus.Idle,
              positionId: destinationId,
              travelId: null,
            }
          : ship
      ),
    }));
  },
}));
