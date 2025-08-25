import React from "react";
import EmployeeGrid from "../../components/EmployeeGrid";
import APP_CONSTANT from "../../constants/constant";
const FusionEmployees = () => {
  return (
    <div>
      <h2> Fusion Employees</h2>
      <EmployeeGrid source={APP_CONSTANT.FUSION} />
    </div>
  );
};

export default FusionEmployees;
