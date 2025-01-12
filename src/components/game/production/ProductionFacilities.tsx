import { Station } from "@/types/Station";
import { ProductionFacility } from "@/types/Production";
import { calculateProductionRate } from "@/helpers/production.helper"; // Helper function to calculate production rate
import FlexWrap from "@/components/shared/FlexWrap";

interface ProductionFacilitiesProps {
  station: Station;
}

const ProductionFacilities = ({ station }: ProductionFacilitiesProps) => {
  return (
    <div>
      <h2>Production Facilities</h2>
      {station.productionFacilities.length === 0 ? (
        <p>No production facilities available.</p>
      ) : (
        <FlexWrap direction="column" className="tw-space-y-2">
          {station.productionFacilities.map((facility: ProductionFacility) => {
            const productionRate = calculateProductionRate(facility); // Calculate production rate
            const resourceName = Object.keys(facility.recipe.output)[0];

            return (
              <div
                key={facility.id}
                className="tw-p-2 tw-border tw-border-gray-600 tw-rounded"
              >
                {facility.name}: Producing {productionRate} {resourceName}
                /second
              </div>
            );
          })}
        </FlexWrap>
      )}
    </div>
  );
};

export default ProductionFacilities;
