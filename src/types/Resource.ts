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

export interface Resource {
  name: ResourceName;
  category: ResourceCategory;
  amount: number;
  basePrice: number;
  sellPrice?: number;
  buyPrice?: number;
}

export type ResourseList = Record<ResourceName, Resource>;
