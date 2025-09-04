import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import FusionEmployees from "./features/fusion/Employees";
import FusionPositions from "./features/fusion/Positions";
import FusionJobs from "./features/fusion/Jobs";

import DarwinEmployees from "./features/darwinbox/Employees";
import DarwinPositions from "./features/darwinbox/Positions";
import DarwinJobs from "./features/darwinbox/Jobs";
import DarwinDesignation from "./features/darwinbox/Designation";

import CompareEmployees from "./features/comparison/Employees";
import PositionSyncPage from "./features/comparison/Positions";
import JobSyncPage from "./features/comparison/Jobs";
import GradeSyncPage from "./features/comparison/Grades";
import DocumentSyncPage from "./features/comparison/DocumentSync";
import DepartmentSyncPage from "./features/comparison/Department";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/fusion/employees" element={<FusionEmployees />} />
          <Route path="/fusion/positions" element={<FusionPositions />} />
          <Route path="/fusion/jobs" element={<FusionJobs />} />

          <Route path="/darwinbox/employees" element={<DarwinEmployees />} />
          <Route path="/darwinbox/positions" element={<DarwinPositions />} />
          <Route path="/darwinbox/jobs" element={<DarwinJobs />} />
          <Route
            path="/darwinbox/designatons"
            element={<DarwinDesignation />}
          />

          <Route path="/compare/employees" element={<CompareEmployees />} />
          <Route path="/compare/positions" element={<PositionSyncPage />} />
          <Route path="/compare/jobs" element={<JobSyncPage />} />
            <Route path="/compare/departments" element={<DepartmentSyncPage />} /> 
          <Route path="/compare/docSync" element={<DocumentSyncPage />} />
          <Route path="/compare/grade" element={<GradeSyncPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
