import React from "react";
import PositionGrid from "../../components/PositionGrid";
import APP_CONSTANT from "../../constants/constant";
const FusionPositions = () => {
  return (
    <div>
      <h2>Fusion Positions</h2>
      <PositionGrid source={APP_CONSTANT.FUSION} />
    </div>
  );
};
export default FusionPositions;
