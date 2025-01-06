import { ResourceName } from "@/types/Resource";
import { Station } from "@/types/Station";
import { Ship } from "@/types/Ship";
import { BaseResourses } from "@/entities/resource.entity";

import ResourceTradeRow from "./ResourceTradeRow";
import { useFleetStore } from "@/stores/fleet.store";
import { useStationsStore } from "@/stores/stations.store";
interface MarketProps {
  // @todo: change to Station | Ship
  source: Station;
  // @todo: change to Station | Ship
  destination: Ship;
}

export default function Market({ source, destination }: MarketProps) {
  const handleTransferToSource = (resource: ResourceName, amount: number) => {
    const currentSourceAmount = source.resources[resource].amount ?? 0;
    useStationsStore
      .getState()
      .setStationResources(source.id, resource, currentSourceAmount + amount);

    const currentDestinationAmount =
      destination.resources[resource].amount ?? 0;
    useFleetStore
      .getState()
      .setShipCargo(
        destination.id,
        resource,
        currentDestinationAmount - amount
      );
  };

  const handleTransferToDestination = (
    resource: ResourceName,
    amount: number
  ) => {
    // for now just add to the ship's cargo
    const currentDestinationAmount =
      destination.resources[resource].amount ?? 0;
    useFleetStore
      .getState()
      .setShipCargo(
        destination.id,
        resource,
        currentDestinationAmount + amount
      );

    // and remove from the station's resources
    const currentSourceAmount = source.resources[resource].amount ?? 0;
    useStationsStore
      .getState()
      .setStationResources(source.id, resource, currentSourceAmount - amount);
  };

  return (
    <div>
      <h1>Market</h1>
      <div>
        <h2>Source: {source.name}</h2>
        <h2>Destination: {destination?.name}</h2>

        {Object.values(BaseResourses).map((resource) => (
          <ResourceTradeRow
            key={resource.name}
            name={resource.name}
            sourceAmount={source.resources[resource.name].amount}
            destinationAmount={
              destination?.resources?.[resource.name]?.amount ?? 0
            }
            sellPrice={source.resources[resource.name].sellPrice ?? 0}
            buyPrice={source.resources[resource.name].buyPrice ?? 0}
            onTransferToSource={(amount) =>
              handleTransferToSource(resource.name, amount)
            }
            onTransferToDestination={(amount) =>
              handleTransferToDestination(resource.name, amount)
            }
            disabled={!destination}
          />
        ))}
      </div>
    </div>
  );
}
