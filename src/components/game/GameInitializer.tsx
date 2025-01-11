import { useEffect, useState } from "react";
import { GameService } from "@/services/game.service";
import { useGameStore } from "@/stores/game.store";
import { Loader } from "@mantine/core";

interface GameInitializerProps {
  children: React.ReactNode;
}

export const GameInitializer = ({ children }: GameInitializerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const error = useGameStore((state) => state.error);

  useEffect(() => {
    const initGame = async () => {
      try {
        await GameService.initializeGame();
      } finally {
        setIsLoading(false);
      }
    };

    initGame();

    // Cleanup on unmount
    return () => {
      // GameService.shutdown();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
        <Loader size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-text-red-500">
        {error}
      </div>
    );
  }

  return <>{children}</>;
};
