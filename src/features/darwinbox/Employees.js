import React from "react";
import EmployeeGrid from "../../components/EmployeeGrid";
import APP_CONSTANT from "../../constants/constant";
const DarwinEmployees = () => {
  return (
    <div>
      <h2>DarwinBox Employees</h2>
      <EmployeeGrid source={APP_CONSTANT.DARWINBOX} />
    </div>
  );
};
export default DarwinEmployees;
