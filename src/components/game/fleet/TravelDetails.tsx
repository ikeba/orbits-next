import { TravelService } from "@/services/travel.service";
import { useEffect } from "react";
import { useTravelStore } from "@/stores/travel.store";
import { useState } from "react";
import FlexWrap from "@/components/shared/FlexWrap";
import { Button } from "@mantine/core";
import { useFleetStore } from "@/stores/fleet.store";
import { useStationsStore } from "@/stores/stations.store";
import { Station } from "@/types/Station";
import { Menu } from "@mantine/core";

export default function TravelDetails({ shipId }: { shipId: string }) {
  const fleetStore = useFleetStore();
  const { stations, getStationById } = useStationsStore();
  const { travels } = useTravelStore();

  const ship = fleetStore.getShipById(shipId);

  const [progress, setProgress] = useState<number | null>(null);
  const [travelTargets, setTravelTargets] = useState<Station[]>([]);

  useEffect(() => {
    setTravelTargets(
      stations.filter((station) => station.id !== ship?.positionId)
    );
  }, [ship, stations]);

  useEffect(() => {
    setProgress(TravelService.getTravelProgressByShipId(shipId));
  }, [travels, shipId]);

  const moveToStation = (stationId: string) => {
    if (!ship) return;
    TravelService.startTravel(ship, stationId);
  };

  if (!ship) return null;

  return (
    <FlexWrap direction="column">
      <b>--- Travel ---</b>

      {!ship.positionId && (
        <>
          <p>Progress: {progress}%</p>
        </>
      )}

      {ship.positionId && (
        <>
          <p>Station: {getStationById(ship.positionId)?.name}</p>
          <Menu width={200}>
            <Menu.Target>
              <Button variant="outline">Travel</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Stations</Menu.Label>
              {travelTargets.map((station) => (
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
  );
}
