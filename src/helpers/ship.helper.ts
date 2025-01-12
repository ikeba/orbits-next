import { Ship } from "@/types/Ship";

/**
 * Get the cargo status of a ship (how much cargo is in the ship) in amount and percentage
 * @param ship
 * @returns
 */
export const getShipCargoStatus = (ship: Ship) => {
  const totalCargo = Object.values(ship.resources).reduce(
    (sum, { amount }) => sum + amount,
    0
  );
  return {
    amount: totalCargo,
    percentage: (totalCargo / ship.cargoSize) * 100,
  };
};
