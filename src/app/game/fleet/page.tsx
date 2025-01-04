"use client";

import Subheader from "@/components/shared/Subheader";
import Button from "@/components/shared/Button";
import FlexWrap from "@/components/shared/FlexWrap";
import { useFleetStore } from "@/stores/fleet.store";
import { useEffect } from "react";

export default function Fleet() {
  const { ships, addShip, selectShip, getSelectedShip } = useFleetStore();

  useEffect(() => {
    if (ships.length === 0) {
      addShip("Ship 1");
    }
  }, []);

  const handleAddShip = () => {
    addShip(`Ship ${ships.length + 1}`);
  };

  const handleSelectShip = (id: string) => {
    selectShip(id);
  };

  return (
    <div className="tw-h-full">
      <Subheader>
        <h1>Fleet</h1>
        <Button onClick={handleAddShip}>Add Ship</Button>
      </Subheader>
      <FlexWrap direction="row" className="tw-h-full">
        <FlexWrap
          direction="column"
          className="tw-h-full tw-w-1/4 tw-border-r tw-border-white"
        >
          {ships.map((ship) => (
            <div
              className="tw-w-full tw-p-4 tw-border-b tw-border-white tw-cursor-pointer hover:tw-bg-white/20"
              key={ship.id}
              onClick={() => handleSelectShip(ship.id)}
            >
              {ship.name}
            </div>
          ))}
        </FlexWrap>
        <div className="tw-w-3/4 tw-h-full tw-p-4">
          <div>{getSelectedShip()?.name}</div>
        </div>
      </FlexWrap>
    </div>
  );
}
