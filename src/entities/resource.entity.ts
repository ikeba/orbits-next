import {
  Resource,
  ResourceCategory,
  ResourceName,
  ResourseList,
} from "@/types/Resource";
import { StationType } from "@/types/Station";

const DEFAULT_STATION_RESOURCES = 1000;

export const BaseResourses: Record<
  ResourceName,
  Omit<Resource, "amount" | "currentPrice">
> = {
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

export const createResource = (
  resourceName: ResourceName,
  amount = DEFAULT_STATION_RESOURCES
): Resource => {
  const resource = BaseResourses[resourceName];

  return {
    ...resource,
    amount,
    sellPrice: resource.basePrice,
    buyPrice: resource.basePrice,
  };
};

export const createStationResources = (
  stationType: StationType
): ResourseList => {
  console.log(stationType);

  return Object.values(ResourceName).reduce(
    (acc, resourceName) => ({
      ...acc,
      [resourceName]: createResource(resourceName),
    }),
    {} as ResourseList
  );
};
