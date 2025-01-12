import {
  ProductionFacility,
  ProductionFacilityName,
  ProductionFacilityType,
  ProductionRecipe,
} from "@/types/Production";
import { ResourceName } from "@/types/Resource";

export const PRODUCTION_FACILITY_RECIPES: Record<
  ProductionFacilityName,
  ProductionRecipe
> = {
  [ProductionFacilityName.WaterExtractor]: {
    output: { [ResourceName.Water]: 2 },
    cycleTime: 5,
  },
  [ProductionFacilityName.MiningDrill]: {
    output: { [ResourceName.IronOre]: 1 },
    cycleTime: 10,
  },
} as const;

export const PRODUCTION_FACILITY_CONFIG: Record<
  ProductionFacilityName,
  Pick<ProductionFacility, "name" | "type" | "recipe">
> = {
  [ProductionFacilityName.WaterExtractor]: {
    name: ProductionFacilityName.WaterExtractor,
    type: ProductionFacilityType.Extractor,
    recipe: PRODUCTION_FACILITY_RECIPES[ProductionFacilityName.WaterExtractor],
  },
  [ProductionFacilityName.MiningDrill]: {
    name: ProductionFacilityName.MiningDrill,
    type: ProductionFacilityType.Extractor,
    recipe: PRODUCTION_FACILITY_RECIPES[ProductionFacilityName.MiningDrill],
  },
} as const;
