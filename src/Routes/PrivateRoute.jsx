import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import UseAdmin from "../Hooks/UseAdmin";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = UseAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <div className="text-center mt-20 text-lg font-medium text-blue-600">
        Checking access...
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default PrivateRoute;
