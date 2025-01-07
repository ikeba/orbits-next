"use client";

import { formatTickToHhMmSs } from "@/helpers/time.helper";
import { useGameStore } from "@/stores/game.store";

export default function Clock() {
  const { tick } = useGameStore();

  return <div>{formatTickToHhMmSs(tick)}</div>;
}
