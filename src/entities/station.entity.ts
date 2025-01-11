import { Station, StationType } from "@/types/Station";
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
    resourcePrices: createStationPrices({ type }),
  };
};

export const BaseStations: Station[] = [
  createStation({
    name: "Central Trading Hub",
    type: StationType.Industrial,
  }),
  createStation({
    name: "Agricultural Center",
    type: StationType.Agricultural,
  }),
  createStation({
    name: "Mining Outpost Alpha",
    type: StationType.Mining,
  }),
];
