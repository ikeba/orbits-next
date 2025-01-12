import { StationType } from "@/types/Station";
import {
  IconHexagon,
  IconWheat,
  IconPick,
  IconBrandShopee,
  IconBuildingFactory2,
} from "@tabler/icons-react";

export default function StationIcon({ type }: { type: StationType }) {
  switch (type) {
    case StationType.Agricultural:
      return <IconWheat size="1rem" />;
    case StationType.Mining:
      return <IconPick size="1rem" />;
    case StationType.Trading:
      return <IconBrandShopee size="1rem" />;
    case StationType.Industrial:
      return <IconBuildingFactory2 size="1rem" />;
    default:
      return <IconHexagon size="1rem" />;
  }
}
