import { ProductionFacility } from "./Production";
import { StationPrices, ResourceStorage } from "./Resource";

export enum StationType {
  Trading = "trading",
  Industrial = "industrial",
  Agricultural = "agricultural",
  Mining = "mining",
}

export interface Station {
  id: string;
  name: string;
  type: StationType;
  resources: ResourceStorage;
  resourcePrices: StationPrices;
  productionFacilities: ProductionFacility[];
}
