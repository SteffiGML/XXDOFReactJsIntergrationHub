import React from "react";
import PositionGrid from "../../components/PositionGrid";
import APP_CONSTANT from "../../constants/constant";
const DarwinPositions = () => {
  return (
    <div>
      <h2>DarwinBox Positions</h2>
      <PositionGrid source={APP_CONSTANT.DARWINBOX} />
    </div>
  );
};
export default DarwinPositions;
