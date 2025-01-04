export type StationType = "industrial" | "agricultural" | "mining";

export interface Station {
  id: string;
  name: string;
  type: StationType;
  position: {
    x: number;
    y: number;
  };
}
