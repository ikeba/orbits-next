"use client";

import { useTimeStore } from "@/stores/time.store";

export default function Clock() {
  const { tick } = useTimeStore();

  return <div>{Math.floor(tick)}</div>;
}
