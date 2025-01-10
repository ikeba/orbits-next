import { ResourceStorage } from "./Resource";

export enum ShipStatus {
  Idle = "idle",
  Moving = "moving",
}

export interface Ship {
  id: string;
  name: string;
  status: ShipStatus;
  positionId: string | null;
  travelId: string | null;
  cargoSize: number;
  resources: ResourceStorage;
}
