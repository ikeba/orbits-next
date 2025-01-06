import { ResourseList } from "./Resource";

export type StationType = "industrial" | "agricultural" | "mining";
export interface Station {
  id: string;
  name: string;
  type: StationType;
  resources: ResourseList;
}
