import { ResourceName, ResourceStorage, StationPrices } from "@/types/Resource";
import { RESOURCES_CONFIG, RESOURCE_AMOUNTS } from "@/configs/resources.config";
import { Station } from "@/types/Station";
import { STATION_PRICES_CONFIG } from "@/configs/stations.config";

export const createStationResources = (): ResourceStorage => {
  return Object.values(RESOURCES_CONFIG).reduce(
    (acc, { name }) => ({
      ...acc,
      [name]: { amount: RESOURCE_AMOUNTS.STATION_DEFAULT },
    }),
    {} as ResourceStorage
  );
};

export const createShipResources = (): ResourceStorage => {
  return Object.values(RESOURCES_CONFIG).reduce(
    (acc, { name }) => ({
      ...acc,
      [name]: { amount: RESOURCE_AMOUNTS.SHIP_DEFAULT },
    }),
    {} as ResourceStorage
  );
};

export const createStationPrices = ({
  type,
}: Pick<Station, "type">): StationPrices => {
  return Object.values(ResourceName).reduce(
    (acc, resourceName) => ({
      ...acc,
      [resourceName]: STATION_PRICES_CONFIG[type][resourceName],
    }),
    {} as StationPrices
  );
};
