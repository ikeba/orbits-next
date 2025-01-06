import { ResourceName } from "./Resource";

export enum ShipStatus {
  Idle = "idle",
  Moving = "moving",
}

export type ShipResources = Record<ResourceName, { amount: number }>;

export interface Ship {
  id: string;
  name: string;
  status: ShipStatus;
  positionId: string | null;
  travelId: string | null;
  cargoSize: number;
  resources: ShipResources;
}
