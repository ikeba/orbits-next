"use client";

import { useGameStore } from "@/stores/game.store";

export default function Clock() {
  const { tick } = useGameStore();

  return <div>{Math.floor(tick)}</div>;
}
