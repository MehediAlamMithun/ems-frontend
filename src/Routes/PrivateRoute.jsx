import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import UseAdmin from "../Hooks/UseAdmin";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = UseAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <div className="text-center mt-20 text-lg font-semibold text-blue-600">
        Loading admin access...
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  // ❌ Not admin — redirect to login or unauthorized page
  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default PrivateRoute;
