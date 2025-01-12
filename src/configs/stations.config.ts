import { ResourceName } from "@/types/Resource";
import { StationType } from "@/types/Station";
import { ProductionFacilityName } from "@/types/Production";

// Key economic features:
// 	1.	Base price range: 3-9 credits
// 	2.	Buy/sell margin: 1 credit (smaller margin for more frequent trading)
// 	3.	Station specializations:
// 	▪	Trading: medium prices +1 credit (universal trading)
// 	▪	Agricultural: cheap water (3-4), expensive minerals (7-8)
// 	▪	Mining: cheap ore (4-5), expensive water and hydrogen (7-9)
// 	▪	Industrial: cheap hydrogen (4-5), medium-high other resources
// Trading opportunities:
// 	1.	Water route: Buy Agricultural (3) → Sell Mining (7) = 4 profit
// 	2.	Ore route: Buy Mining (4) → Sell Agricultural (7) = 3 profit
// 	3.	Hydrogen route: Buy Industrial (4) → Sell Mining (8) = 4 profit
// This creates a balanced early-game economy where:
// 	•	Single trades can be profitable
// 	•	Multiple-stop routes can maximize earnings
// 	•	Trading stations provide alternative routes
// 	•	Each station type has clear economic advantages

// Default prices for each station type
export const STATION_PRICES_CONFIG = {
  [StationType.Trading]: {
    // Trading stations have balanced prices with small markup
    // Acts as a universal hub for resource distribution
    [ResourceName.Water]: { sellPrice: 6, buyPrice: 5 },
    [ResourceName.IronOre]: { sellPrice: 7, buyPrice: 6 },
    [ResourceName.Hydrogen]: { sellPrice: 7, buyPrice: 6 },
  },
  [StationType.Agricultural]: {
    // Agricultural stations produce water efficiently
    // Lowest water prices but higher prices for industrial resources
    [ResourceName.Water]: { sellPrice: 4, buyPrice: 3 },
    [ResourceName.IronOre]: { sellPrice: 8, buyPrice: 7 },
    [ResourceName.Hydrogen]: { sellPrice: 8, buyPrice: 7 },
  },
  [StationType.Mining]: {
    // Mining stations specialize in ore extraction
    // Needs water and hydrogen for operations
    [ResourceName.Water]: { sellPrice: 8, buyPrice: 7 },
    [ResourceName.IronOre]: { sellPrice: 5, buyPrice: 4 },
    [ResourceName.Hydrogen]: { sellPrice: 9, buyPrice: 8 },
  },
  [StationType.Industrial]: {
    // Industrial stations focus on hydrogen processing
    // Requires all resources for manufacturing
    [ResourceName.Water]: { sellPrice: 7, buyPrice: 6 },
    [ResourceName.IronOre]: { sellPrice: 8, buyPrice: 7 },
    [ResourceName.Hydrogen]: { sellPrice: 5, buyPrice: 4 },
  },
} as const;

// Base stations list
export const BASE_STATIONS_CONFIG = [
  {
    name: "Central Trading Hub",
    type: StationType.Trading,
  },
  {
    name: "Agricultural Center",
    type: StationType.Agricultural,
  },
  {
    name: "Mining Outpost Alpha",
    type: StationType.Mining,
  },
  {
    name: "Industrial Hub",
    type: StationType.Industrial,
  },
] as const;

// Default facilities for each station type
export const STATION_DEFAULT_FACILITIES: Partial<
  Record<StationType, ProductionFacilityName[]>
> = {
  [StationType.Agricultural]: [
    ProductionFacilityName.WaterExtractor, // Basic water production
  ],
  [StationType.Mining]: [
    ProductionFacilityName.MiningDrill, // Basic ore extraction
  ],
  // Industrial and trading stations start without production facilities
} as const;
