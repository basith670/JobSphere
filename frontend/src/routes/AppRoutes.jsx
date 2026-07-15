import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import CandidateLayout from "../layouts/CandidateLayout";

import ProtectedRoute from "../components/auth/ProtectedRoute";

import Home from "../pages/Home/Home";
import Jobs from "../pages/Jobs/Jobs";
import Companies from "../pages/Companies/Companies";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import Dashboard from "../pages/Candidate/Dashboard";
import Profile from "../pages/Candidate/Profile";

import ResumeManager from "../pages/Resume/ResumeManager";

import ResumeAnalysis from "../pages/AIResume/ResumeAnalysis";
import JobMatch from "../pages/AIResume/JobMatch";
import CoverLetter from "../pages/AIResume/CoverLetter";
import Interview from "../pages/AIResume/Interview";
import MockInterview from "../pages/AIResume/MockInterview";

import NotFound from "../pages/NotFound/NotFound";

import JobDetails from "../pages/Jobs/JobDetails";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={<Home />}
          />

          {/* Public companies page */}
          <Route
            path="/companies"
            element={<Companies />}
          />

        </Route>

        {/* ================= AUTH ================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= JOB SEEKER ================= */}

        <Route
          element={
            <ProtectedRoute roles={["jobseeker"]}>
              <CandidateLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/jobs"
            element={<Jobs />}
          />

          <Route

          path="/jobs/details/:id"

          element={<JobDetails />}

          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/resumes"
            element={<ResumeManager />}
          />

          <Route
            path="/ai-resume/:resumeId"
            element={<ResumeAnalysis />}
          />

          <Route
            path="/job-match"
            element={<JobMatch />}
          />

          <Route
            path="/cover-letter"
            element={<CoverLetter />}
          />

          <Route
            path="/interview"
            element={<Interview />}
          />

          <Route
            path="/mock-interview"
            element={<MockInterview />}
          />
        </Route>

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;