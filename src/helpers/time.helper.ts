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
