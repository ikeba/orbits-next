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
  //   Manufacturer = "manufacturer",

  //   // Complex multi-resource production
  //   // Space: Research Lab, Quantum Forge
  //   // Sea: Factory, Trading Company
  //   Complex = "complex",
}

export enum ProductionFacilityName {
  // Extractors (no input or minimal input)
  WaterExtractor = "WaterExtractor",
  MiningDrill = "MiningDrill",
}

/**
 * Production facility instance
 * Represents a single production unit in a location (station/city/port)
 */
export interface ProductionFacilityInfo {
  type: ProductionFacilityType;
  name: ProductionFacilityName;
  recipe: ProductionRecipe;
}

export enum ProductionStatus {
  Idle = "idle",
  InProgress = "in_progress",
}

export interface ProductionFacility {
  id: string;
  name: ProductionFacilityName;
  type: ProductionFacilityType;
  recipe: ProductionRecipe;
  progress: number;
  startTime: number | null;
  status: ProductionStatus;
}

/**
 * Production recipe defines the transformation of resources
 * Input resources + time = output resources
 */
export interface ProductionRecipe {
  input?: Partial<Record<ResourceName, number>>; // Required resources and their amounts
  output: Partial<Record<ResourceName, number>>; // Produced resources and their amounts
  cycleTime: number; // Production cycle duration in seconds
}
