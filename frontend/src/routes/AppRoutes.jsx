import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Jobs from "../pages/Jobs/Jobs";
import Companies from "../pages/Companies/Companies";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Candidate/Profile";
import NotFound from "../pages/NotFound/NotFound";
import ResumeManager from "../pages/Resume/ResumeManager";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/profile" element={<Profile />} />

        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
        <Route path="/resumes" element={<ResumeManager />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;