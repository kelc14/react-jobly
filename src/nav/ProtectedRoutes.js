import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UsernameContext from "../hooks/UsernameContext";

const ProtectedRoutes = ({ children }) => {
  const username = useContext(UsernameContext);

  if (!username) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedRoutes;
