import FlexWrap from "@/components/shared/FlexWrap";
import { Station } from "@/types/Station";
import { useStationsStore } from "@/stores/stations.store";
import StationCard from "../station/StationCard";

export default function StationPanel({
  selectedStationId,
  onNavigate,
}: {
  selectedStationId: string | null;
  onNavigate: (stationId: string) => void;
}) {
  const { stations } = useStationsStore();

  return (
    <div className="tw-h-full tw-overflow-y-auto tw-bg-o-dark tw-p-2 tw-border-r tw-border-white/50">
      <FlexWrap direction="column" className="tw-space-y-2">
        {stations.map((station: Station) => (
          <StationCard
            key={station.id}
            station={station}
            selected={station.id === selectedStationId}
            onClick={() => onNavigate(station.id)}
          />
        ))}
      </FlexWrap>
    </div>
  );
}
