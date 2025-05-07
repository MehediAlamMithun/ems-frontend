//Used Javascript, React Library
import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const firstName = user?.displayName?.split(" ")[0] || "Employee";
  // I Used Tailwind CSS Library for styling
  return (
    <div className="text-center mt-24">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">
        Welcome, {firstName}!
      </h1>
      <p className="text-gray-600 text-lg">
        Select an option from the sidebar to view your profile, attendance,
        payroll, or performance details.
      </p>
    </div>
  );
};

export default DashboardHome;
