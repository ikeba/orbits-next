/**
 * All resources are categorized into one of these types.
 */
export enum ResourceCategory {
  Food = "food",
  Ore = "ore",
  Fuel = "fuel",
}

/**
 * Specific resources.
 */
export enum ResourceName {
  // food
  Water = "water",
  // ore
  Iron = "iron",
  // fuel
  Hydrogen = "hydrogen",
}

export interface ResourceAmount {
  amount: number;
}

// Type for storing resources (same for ships and stations)
export type ResourceStorage = Record<ResourceName, ResourceAmount>;

// Resource information (without amount)
export interface ResourceInfo {
  name: ResourceName;
  category: ResourceCategory;
  basePrice: number;
}

// Prices for resources for a specific station
export interface ResourcePrice {
  sellPrice: number;
  buyPrice: number;
}

export type StationPrices = Record<ResourceName, ResourcePrice>;
