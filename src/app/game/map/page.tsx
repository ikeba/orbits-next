"use client";

import { useMemo, useState } from "react";
import FlexWrap from "@/components/shared/FlexWrap";
import { useFleetStore } from "@/stores/fleet.store";
import { useStationsStore } from "@/stores/stations.store";
import StationDetails from "@/components/game/station/StationDetails";
import StationPanel from "@/components/game/panels/StationPanel";

export default function Map() {
  const { stations, getStationById } = useStationsStore();
  const { ships } = useFleetStore();

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
    <FlexWrap direction="row" className="tw-h-full">
      <StationPanel
        selectedStationId={selectedStationId}
        onNavigate={setSelectedStationId}
      />
      <div className="tw-h-full tw-w-3/4">
        {selectedStation ? (
          <StationDetails station={selectedStation} dockedShips={dockedShips} />
        ) : (
          <div>Select a station</div>
        )}
      </div>
    </FlexWrap>
  );
}
