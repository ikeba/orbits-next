import { Station } from "@/types/Station";
import { createStationResources } from "./resource.entity";

export const createStation = ({
  name,
  type,
}: Omit<Station, "id" | "resources">): Station => {
  return {
    id: `station-${Math.random().toString(36).substring(2, 15)}`,
    name,
    type,
    resources: createStationResources(type),
  };
};

export const BaseStations: Station[] = [
  createStation({
    name: "Central Trading Hub",
    type: "industrial",
  }),
  createStation({
    name: "Agricultural Center",
    type: "agricultural",
  }),
  createStation({
    name: "Mining Outpost Alpha",
    type: "mining",
  }),
];
