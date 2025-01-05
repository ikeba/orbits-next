"use client";

import Subheader from "@/components/shared/Subheader";
import UiButton from "@/components/shared/UiButton";
import FlexWrap from "@/components/shared/FlexWrap";
import { useFleetStore } from "@/stores/fleet.store";
import { useMemo } from "react";
import UiList from "@/components/shared/UiList";
import ShipDetails from "@/components/game/fleet/ShipDetails";
import { useStationsStore } from "@/stores/stations.store";

export default function Fleet() {
  const { ships, addShip, selectShip, getSelectedShip } = useFleetStore();
  const { stations } = useStationsStore();

  // useEffect(() => {
  //   if (ships.length === 0) {
  //     addShip("Ship 1");
  //   }
  // }, []);

  const handleAddShip = () => {
    const ship = addShip({
      name: `Ship ${ships.length + 1}`,
      stationId: stations[0].id,
    });
    selectShip(ship.id);
  };

  const handleSelectShip = (id: string) => {
    selectShip(id);
  };

  const normalizedShips = useMemo(
    () =>
      ships.map((ship) => ({
        id: ship.id,
        label: ship.name,
      })),
    [ships]
  );

  const selectedShip = getSelectedShip();

  return (
    <div className="tw-h-full">
      <Subheader>
        <h1>Fleet</h1>
        <UiButton onClick={handleAddShip}>Add Ship</UiButton>
      </Subheader>
      <FlexWrap direction="row" className="tw-h-full">
        <UiList
          bordered
          items={normalizedShips}
          onItemClick={handleSelectShip}
          className="tw-h-full tw-w-1/4 tw-border-r tw-border-white"
        />
        <div className="tw-w-3/4 tw-h-full">
          {selectedShip && <ShipDetails ship={selectedShip} />}
        </div>
      </FlexWrap>
    </div>
  );
}
