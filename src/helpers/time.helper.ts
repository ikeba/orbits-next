export const formatTickToHhMmSs = (tick: number) => {
  const hours = Math.floor(tick / 3600);
  const minutes = Math.floor((tick % 3600) / 60);
  const seconds = Math.floor(tick % 60);

  // Pad with leading zeros to ensure hh:mm:ss format
  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const paddedSeconds = seconds.toString().padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};

/**
 * Calculate elapsed seconds since start time
 */
export const getElapsedSeconds = (startTime: number): number => {
  const currentTime = Date.now();
  return (currentTime - startTime) / 1000;
};

/**
 * Calculate progress based on elapsed time and total time
 */
export const calculateTimeProgress = (
  startTime: number,
  totalTimeSeconds: number
): number => {
  const elapsedSeconds = getElapsedSeconds(startTime);
  return Math.min(1, elapsedSeconds / totalTimeSeconds);
};
