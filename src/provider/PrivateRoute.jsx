import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // যদি auth check চলছে
  if (loading) return <div>Loading...</div>;

  // যদি user না থাকে
  if (!user) return <Navigate to="/login" replace />;

  // যদি user থাকে
  return children;
};

export default PrivateRoute;
