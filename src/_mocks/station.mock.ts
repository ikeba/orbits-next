import { Station } from "@/types/Station";

export const createStation = ({
  name,
  type,
  position,
}: Omit<Station, "id">): Station => {
  return {
    id: `station-${Math.random().toString(36).substring(2, 15)}`,
    name,
    type,
    position,
  };
};

// const prefixes = ["Alpha", "Beta", "Gamma", "Delta", "Omega"];
// const suffixes = ["Port", "Station", "Hub", "Base", "Colony"];

// const generateStationName = () => {
//   const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
//   const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
//   return `${prefix} ${suffix}`;
// };

// const generatePosition = () => ({
//   x: Math.floor(Math.random() * 80) + 10, // 10-90, чтобы не было станций у края
//   y: Math.floor(Math.random() * 80) + 10,
// });

export const initialStations: Station[] = [
  // Фиксированные основные станции
  createStation({
    name: "Central Trading Hub",
    type: "industrial",
    position: { x: 50, y: 50 },
  }),
  createStation({
    name: "Agricultural Center",
    type: "agricultural",
    position: { x: 30, y: 70 },
  }),
  createStation({
    name: "Mining Outpost Alpha",
    type: "mining",
    position: { x: 70, y: 30 },
  }),

  //   // Случайные дополнительные станции
  //   ...Array.from({ length: 5 }, () => {
  //     const types: StationType[] = ["industrial", "agricultural", "mining"];
  //     const randomType = types[Math.floor(Math.random() * types.length)];

  //     return createStation(generateStationName(), randomType, generatePosition());
  //   }),
];
