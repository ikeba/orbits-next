"use client";

import FlexWrap from "@/components/shared/FlexWrap";
import Subheader from "@/components/shared/Subheader";
import UiList from "@/components/shared/UiList";
import { useStationsStore } from "@/stores/stations.store";
import { useMemo } from "react";

export default function Map() {
  const { stations } = useStationsStore();

  const normalizedStations = useMemo(
    () =>
      stations.map((station) => ({
        id: station.id,
        label: station.name,
      })),
    [stations]
  );

  const handleSelectStation = (id: string) => {
    console.log(id);
  };

  return (
    <div className="tw-h-full">
      <Subheader>
        <h1>Map</h1>
      </Subheader>
      <FlexWrap direction="row" className="tw-h-full">
        <UiList
          bordered
          items={normalizedStations}
          onItemClick={handleSelectStation}
          className="tw-h-full tw-w-1/4 tw-border-r tw-border-white"
        />
      </FlexWrap>
    </div>
  );
}
