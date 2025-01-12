"use client";

import { useMemo, useState } from "react";
import FlexWrap from "@/components/shared/FlexWrap";
import Subheader from "@/components/shared/Subheader";
import UiList from "@/components/shared/UiList";
import { useFleetStore } from "@/stores/fleet.store";
import { useStationsStore } from "@/stores/stations.store";
import StationDetails from "@/components/game/station/StationDetails";

export default function Map() {
  const { stations, getStationById } = useStationsStore();
  const { ships } = useFleetStore();

  const normalizedStations = useMemo(() => {
    const getDockedShips = (stationId: string) => {
      return ships.filter((ship) => ship.positionId === stationId);
    };

    return stations.map((station) => ({
      id: station.id,
      label: station.name,
      afterLabel: `(${getDockedShips(station.id).length})`,
    }));
  }, [stations, ships]);

  const [selectedStationId, setSelectedStationId] = useState<string | null>(
    stations[0]?.id || null
  );

  const dockedShips = useMemo(() => {
    return ships.filter((ship) => ship.positionId === selectedStationId);
  }, [ships, selectedStationId]);

  const selectedStation = useMemo(() => {
    if (!selectedStationId) return null;
    return getStationById(selectedStationId);
  }, [stations, selectedStationId, getStationById]);

  return (
    <div className="tw-h-full">
      <Subheader>
        <h1>Map</h1>
      </Subheader>
      <FlexWrap direction="row" className="tw-h-full">
        <UiList
          bordered
          items={normalizedStations}
          onItemClick={setSelectedStationId}
          className="tw-h-full tw-w-1/4 tw-border-r tw-border-white"
        />
        <div className="tw-h-full tw-w-3/4">
          {selectedStation ? (
            <StationDetails
              station={selectedStation}
              dockedShips={dockedShips}
            />
          ) : (
            <div>Select a station</div>
          )}
        </div>
      </FlexWrap>
    </div>
  );
}
