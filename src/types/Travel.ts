export enum TravelStatus {
  Pending = "pending",
  InProgress = "in_progress",
  Completed = "completed",
}

export interface Travel {
  id: string;
  shipId: string;
  fromId: string;
  toId: string;
  status: TravelStatus;
  startTime: number;
  distance: number;
  coveredDistance: number;
  speed: number;
}
