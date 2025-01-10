import { Station } from "@/types/Station";
import { createStationPrices, createStationResources } from "./resource.entity";
import { getRandomId } from "@/helpers/string.helper";

export const createStation = ({
  name,
  type,
}: Pick<Station, "name" | "type">): Station => {
  return {
    id: `station_${name.toLowerCase().replace(/\s+/g, "-")}_${getRandomId()}`,
    name,
    type,
    resources: createStationResources(),
    resourcePrices: createStationPrices(),
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
