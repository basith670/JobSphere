import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import CandidateLayout from "../layouts/CandidateLayout";
import RecruiterLayout from "../layouts/RecruiterLayout";

import ProtectedRoute from "../components/auth/ProtectedRoute";

import Home from "../pages/Home/Home";
import Jobs from "../pages/Jobs/Jobs";
import JobDetails from "../pages/Jobs/JobDetails";
import Companies from "../pages/Companies/Companies";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import Dashboard from "../pages/Candidate/Dashboard";
import Profile from "../pages/Candidate/Profile";
import CandidateSettings from "../pages/Candidate/Settings";

import ResumeManager from "../pages/Resume/ResumeManager";

import ResumeAnalysis from "../pages/AIResume/ResumeAnalysis";
import JobMatch from "../pages/AIResume/JobMatch";
import CoverLetter from "../pages/AIResume/CoverLetter";
import Interview from "../pages/AIResume/Interview";
import MockInterview from "../pages/AIResume/MockInterview";

import RecruiterDashboard from "../pages/Recruiter/Dashboard";
import CreateJob from "../pages/Recruiter/CreateJob";
import RecruiterJobs from "../pages/Recruiter/Jobs";
import ViewJob from "../pages/Recruiter/ViewJob";
import Applicants from "../pages/Recruiter/Applicants";
import ApplicantDetails from "../pages/Recruiter/ApplicantDetails";
import Company from "../pages/Recruiter/Company";
import Analytics from "../pages/Recruiter/Analytics";
import RecruiterSettings from "../pages/Recruiter/Settings";

import MyApplications from "../pages/Applications/MyApplications";

import AICareerHub from "../pages/AICareerHub/AICareerHub";
import ATSScore from "../pages/ATSScore/ATSScore";

import NotFound from "../pages/NotFound/NotFound";

import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";

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

          <Route
            path="/companies"
            element={<Companies />}
          />

          <Route
            path="/jobs"
            element={<Jobs />}
          />

          <Route
            path="/jobs/details/:id"
            element={<JobDetails />}
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

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
            path="/reset-password/:uid/:token"
            element={<ResetPassword />}
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
            path="/applications"
            element={<MyApplications />}
          />

          <Route
            path="/ai-career-hub"
            element={<AICareerHub />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/settings"
            element={<CandidateSettings />}
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

        {/* ================= RECRUITER ================= */}

        <Route
          element={
            <ProtectedRoute roles={["recruiter"]}>
              <RecruiterLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/recruiter/dashboard"
            element={<RecruiterDashboard />}
          />

          <Route
            path="/recruiter/jobs"
            element={<RecruiterJobs />}
          />

          <Route
            path="/recruiter/jobs/create"
            element={<CreateJob />}
          />

          <Route
            path="/recruiter/jobs/:id/edit"
            element={<CreateJob />}
          />

          <Route
            path="/recruiter/jobs/:id"
            element={<ViewJob />}
          />

          <Route
            path="/recruiter/applicants"
            element={<Applicants />}
          />

          <Route
            path="/recruiter/applicants/:id"
            element={<ApplicantDetails />}
          />

          <Route
            path="/recruiter/companies"
            element={<Company />}
          />

          <Route
            path="/recruiter/analytics"
            element={<Analytics />}
          />

          <Route
            path="/recruiter/settings"
            element={<RecruiterSettings />}
          />

        </Route>

        {/* ================= ATS ================= */}

        <Route
          path="/ats-score"
          element={<ATSScore />}
        />

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