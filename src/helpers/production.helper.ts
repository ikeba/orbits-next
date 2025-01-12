import { ProductionFacility } from "@/types/Production";

export const calculateProductionRate = (
  facility: ProductionFacility
): number => {
  // Assuming each facility has a recipe with cycleTime and output
  const output = facility.recipe.output;
  const cycleTime = facility.recipe.cycleTime;

  // Calculate production rate (resources per second)
  return (
    Object.values(output).reduce((total, amount) => total + amount, 0) /
    cycleTime
  );
};
