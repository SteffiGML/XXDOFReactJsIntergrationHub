import React from "react";
import JobGrid from "../../components/JobGrid";
import APP_CONSTANT from "../../constants/constant";
const DarwinJobs = () => {
  return (
    <div>
      <h2>DarwinBox Jobs</h2>
      <JobGrid source={APP_CONSTANT.DARWINBOX} />
    </div>
  );
};
export default DarwinJobs;
