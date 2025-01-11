import { ResourceName } from "@/types/Resource";
import { StationType } from "@/types/Station";

// Default prices for each station type
export const STATION_PRICES_CONFIG = {
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
} as const;

// Base stations list
export const BASE_STATIONS_CONFIG = [
  {
    name: "Central Trading Hub",
    type: StationType.Industrial,
  },
  {
    name: "Agricultural Center",
    type: StationType.Agricultural,
  },
  {
    name: "Mining Outpost Alpha",
    type: StationType.Mining,
  },
] as const;
