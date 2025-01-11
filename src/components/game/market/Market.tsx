import { ResourceName } from "@/types/Resource";
import { Station } from "@/types/Station";
import { Ship } from "@/types/Ship";
import { BaseResourses } from "@/entities/resource.entity";
import { TradeService } from "@/services/trade.service";

import ResourceTradeRow from "./ResourceTradeRow";

interface MarketProps {
  source: Station;
  destination: Ship;
}

export default function Market({ source, destination }: MarketProps) {
  const handleTransferToSource = (resource: ResourceName, amount: number) => {
    TradeService.executeTransaction({
      fromId: destination.id,
      toId: source.id,
      resource,
      amount,
    });
  };

  const handleTransferToDestination = (
    resource: ResourceName,
    amount: number
  ) => {
    TradeService.executeTransaction({
      fromId: source.id,
      toId: destination.id,
      resource,
      amount,
    });
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
            sellPrice={source.resourcePrices[resource.name].sellPrice}
            buyPrice={source.resourcePrices[resource.name].buyPrice}
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
