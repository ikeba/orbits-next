import {
  ResourceCategory,
  ResourceInfo,
  ResourceName,
  ResourceStorage,
  StationPrices,
} from "@/types/Resource";
import { Station, StationType } from "@/types/Station";

const DEFAULT_STATION_RESOURCES = 100;
const DEFAULT_SHIP_RESOURCES = 0;
const DEFAULT_STATION_PRICES = {
  [StationType.Industrial]: {
    [ResourceName.Water]: { sellPrice: 2, buyPrice: 1 },
    [ResourceName.Iron]: { sellPrice: 2, buyPrice: 1 },
    [ResourceName.Hydrogen]: { sellPrice: 2, buyPrice: 1 },
  },
  [StationType.Agricultural]: {
    [ResourceName.Water]: { sellPrice: 1, buyPrice: 4 },
    [ResourceName.Iron]: { sellPrice: 2, buyPrice: 1 },
    [ResourceName.Hydrogen]: { sellPrice: 2, buyPrice: 1 },
  },
  [StationType.Mining]: {
    [ResourceName.Water]: { sellPrice: 2, buyPrice: 1 },
    [ResourceName.Iron]: { sellPrice: 2, buyPrice: 1 },
    [ResourceName.Hydrogen]: { sellPrice: 2, buyPrice: 1 },
  },
};

export const BaseResourses: Record<ResourceName, ResourceInfo> = {
  [ResourceName.Water]: {
    name: ResourceName.Water,
    category: ResourceCategory.Food,
    basePrice: 1,
  },
  [ResourceName.Iron]: {
    name: ResourceName.Iron,
    category: ResourceCategory.Ore,
    basePrice: 1,
  },
  [ResourceName.Hydrogen]: {
    name: ResourceName.Hydrogen,
    category: ResourceCategory.Fuel,
    basePrice: 1,
  },
};

export const createStationResources = (): ResourceStorage => {
  return Object.values(ResourceName).reduce(
    (acc, resourceName) => ({
      ...acc,
      [resourceName]: { amount: DEFAULT_STATION_RESOURCES },
    }),
    {} as ResourceStorage
  );
};

export const createShipResources = (): ResourceStorage => {
  return Object.values(ResourceName).reduce(
    (acc, resourceName) => ({
      ...acc,
      [resourceName]: { amount: DEFAULT_SHIP_RESOURCES },
    }),
    {} as ResourceStorage
  );
};

export const createStationPrices = ({
  type,
}: Pick<Station, "type">): StationPrices => {
  return Object.values(ResourceName).reduce(
    (acc, resourceName) => ({
      ...acc,
      [resourceName]: DEFAULT_STATION_PRICES[type][resourceName],
    }),
    {} as StationPrices
  );
};
