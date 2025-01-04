export enum ShipStatus {
  Idle = "idle",
  Moving = "moving",
}

export interface Ship {
  id: string;
  name: string;
  status: ShipStatus;
}
