import React from "react";
import JobGrid from "../../components/JobGrid";
import APP_CONSTANT from "../../constants/constant";
const FusionJobs = () => {
  return (
    <div>
      <h2>Fusion Jobs</h2>
      <JobGrid source={APP_CONSTANT.FUSION} />
    </div>
  );
};
export default FusionJobs;
