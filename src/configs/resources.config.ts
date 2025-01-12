import { ResourceCategory, ResourceName, ResourceInfo } from "@/types/Resource";

// Base resource configurations
export const RESOURCES_CONFIG: Record<ResourceName, ResourceInfo> = {
  [ResourceName.Water]: {
    name: ResourceName.Water,
    category: ResourceCategory.Food,
    basePrice: 1,
  },
  [ResourceName.IronOre]: {
    name: ResourceName.IronOre,
    category: ResourceCategory.Ore,
    basePrice: 1,
  },
  [ResourceName.Hydrogen]: {
    name: ResourceName.Hydrogen,
    category: ResourceCategory.Fuel,
    basePrice: 1,
  },
} as const;

// Default amounts
export const RESOURCE_AMOUNTS = {
  STATION_DEFAULT: 100,
  SHIP_DEFAULT: 0,
} as const;
