import { create } from "zustand";
import { Ship, ShipResources, ShipStatus } from "@/types/Ship";
import { ResourceName } from "@/types/Resource";

const DEFAULT_CARGO_SIZE = 1000;

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
  setShipPosition: (shipId: string, positionId: string | null) => void;
  setShipStatus: (shipId: string, status: ShipStatus) => void;
  setShipTravelId: (shipId: string, travelId: string | null) => void;
  setShipCargo: (
    shipId: Ship["id"],
    resourceName: ResourceName,
    newAmount: number
  ) => void;
}

export const createEmptyResources = (): ShipResources => {
  return Object.values(ResourceName).reduce(
    (acc, resourceName) => ({
      ...acc,
      [resourceName]: { amount: 0 },
    }),
    {} as ShipResources
  );
};

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
      cargoSize: DEFAULT_CARGO_SIZE,
      status: ShipStatus.Idle,
      positionId,
      travelId: null,
      resources: createEmptyResources(),
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
}));
