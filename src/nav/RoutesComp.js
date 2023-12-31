import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// components
import Home from "../home/Home";

import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import Companies from "../companies/Companies";
import CompanyDetails from "../companies/CompanyDetails";
import Jobs from "../jobs/Jobs";
import ProfileForm from "../profile/ProfileForm";
import ProtectedRoutes from "./ProtectedRoutes";

const RoutesComp = ({ loginUser, updateUser, addNewJob }) => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm loginUser={loginUser} />} />
      <Route path="/signup" element={<SignUpForm loginUser={loginUser} />} />

      <Route
        path="/companies"
        element={
          <ProtectedRoutes>
            <Companies />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/companies/:handle"
        element={
          <ProtectedRoutes>
            =<CompanyDetails addNewJob={addNewJob} />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/jobs"
        element={
          <ProtectedRoutes>
            <Jobs addNewJob={addNewJob} />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/profile"
        updateUser={updateUser}
        element={
          <ProtectedRoutes updateUser={updateUser}>
            <ProfileForm updateUser={updateUser} />
          </ProtectedRoutes>
        }
      />

      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesComp;
