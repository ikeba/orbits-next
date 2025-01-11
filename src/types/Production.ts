import { ResourceName } from "./Resource";

/**
 * Types of production facilities
 * Abstracted to work with any theme (space, sea, etc.)
 * Each type represents a different level of production complexity
 */
export enum ProductionFacilityType {
  // Basic resource extraction/generation
  // Space: Hydroponics, Mining Drill
  // Sea: Farm, Fishing Dock
  Extractor = "extractor",

  // Basic resource processing
  // Space: Refinery, Water Purifier
  // Sea: Mill, Smokehouse
  Processor = "processor",

  // Advanced resource processing
  // Space: Assembly Line, Chemical Lab
  // Sea: Workshop, Shipyard
  Manufacturer = "manufacturer",

  // Complex multi-resource production
  // Space: Research Lab, Quantum Forge
  // Sea: Factory, Trading Company
  Complex = "complex",
}

/**
 * Production facility instance
 * Represents a single production unit in a location (station/city/port)
 */
export interface ProductionFacility {
  id: string;
  type: ProductionFacilityType;
  name: string;
  recipe: ProductionRecipe;
  progress: number; // Current production progress (0 to 1)
}

/**
 * Production recipe defines the transformation of resources
 * Input resources + time = output resources
 */
export interface ProductionRecipe {
  input: Record<ResourceName, number>; // Required resources and their amounts
  output: Record<ResourceName, number>; // Produced resources and their amounts
  cycleTime: number; // Production cycle duration in seconds
}

// Example usage:
// const spaceRecipes = {
//   hydroponics: {
//     type: ProductionFacilityType.Extractor,
//     input: { [ResourceName.Water]: 1 },
//     output: { [ResourceName.Food]: 2 },
//     cycleTime: 60,
//   },
//   refinery: {
//     type: ProductionFacilityType.Processor,
//     input: { [ResourceName.Iron]: 2 },
//     output: { [ResourceName.Steel]: 1 },
//     cycleTime: 120,
//   },
// };
