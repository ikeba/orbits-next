import FlexWrap from "@/components/shared/FlexWrap";
import { Menu, Button } from "@mantine/core";
import { Ship } from "@/types/Ship";
import { useStationsStore } from "@/stores/stations.store";
import { useTravelStore } from "@/stores/travel.store";

export default function ShipDetails({ ship }: { ship: Ship }) {
  const { stations, getStationById } = useStationsStore();
  const { addTravel } = useTravelStore();

  const moveToStation = (stationId: string) => {
    if (!ship.positionId) return;
    addTravel({
      shipId: ship.id,
      fromId: ship.positionId,
      toId: stationId,
      speed: 1,
    });
  };

  const possibleStations = stations.filter(
    (station) => station.id !== ship.positionId
  );

  return (
    <div className="tw-p-4">
      <FlexWrap direction="column">
        <b>{ship.name}</b>
        <p>Status: {ship.status}</p>
        {ship.positionId && (
          <>
            <p>Station: {getStationById(ship.positionId)?.name}</p>
            <Menu width={200}>
              <Menu.Target>
                <Button variant="outline">Travel</Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Stations</Menu.Label>
                {possibleStations.map((station) => (
                  <Menu.Item
                    key={station.id}
                    onClick={() => moveToStation(station.id)}
                  >
                    {station.name}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </>
        )}
      </FlexWrap>
    </div>
  );
}
