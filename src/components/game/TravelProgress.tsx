import { memo } from "react";
import { useTravel } from "@/hooks/useTravel.hook";
import { Progress } from "@mantine/core";

export default memo(
  ({ shipId, className }: { shipId: string; className?: string }) => {
    const { progress } = useTravel(shipId);
    return (
      <Progress
        radius="xs"
        size="sm"
        value={progress}
        animated
        className={`tw-w-full ${className}`}
      />
    );
  }
);
