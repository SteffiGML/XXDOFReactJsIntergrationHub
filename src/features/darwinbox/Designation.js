import React from "react";
import DesignationGrid from "../../components/DesignationGrid";
import APP_CONSTANT from "../../constants/constant";
const DarwinDesignation = () => {
  return (
    <div>
      <h2>DarwinBox Designation</h2>
     <DesignationGrid source={APP_CONSTANT.DARWINBOX} /> 
    </div>
  );
};
export default DarwinDesignation;
