import {
  ResourceCategory,
  ResourceInfo,
  ResourceName,
  ResourceStorage,
  StationPrices,
} from "@/types/Resource";

const DEFAULT_STATION_RESOURCES = 100;
const DEFAULT_SHIP_RESOURCES = 0;
const DEFAULT_STATION_PRICES = {
  [ResourceName.Water]: { sellPrice: 1, buyPrice: 1 },
  [ResourceName.Iron]: { sellPrice: 1, buyPrice: 1 },
  [ResourceName.Hydrogen]: { sellPrice: 1, buyPrice: 1 },
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
      [resourceName]: DEFAULT_STATION_RESOURCES,
    }),
    {} as ResourceStorage
  );
};

export const createShipResources = (): ResourceStorage => {
  return Object.values(ResourceName).reduce(
    (acc, resourceName) => ({ ...acc, [resourceName]: DEFAULT_SHIP_RESOURCES }),
    {} as ResourceStorage
  );
};

export const createStationPrices = (): StationPrices => {
  return Object.values(ResourceName).reduce(
    (acc, resourceName) => ({
      ...acc,
      [resourceName]: DEFAULT_STATION_PRICES[resourceName],
    }),
    {} as StationPrices
  );
};
