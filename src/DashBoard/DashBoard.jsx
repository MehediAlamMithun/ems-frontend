//Used Javascript, React Library
import React from "react";
import { Link, Outlet } from "react-router-dom";
import UseAdmin from "../Hooks/UseAdmin";

const DashBoard = () => {
  const [isAdmin] = UseAdmin();
  // I Used Tailwind CSS Library for styling
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-3">
          <Link to="profile" className="block hover:text-gray-300">
            Profile
          </Link>
          <Link to="attendance" className="block hover:text-gray-300">
            Attendance
          </Link>
          <Link to="feedback" className="block hover:text-gray-300">
            Feedback
          </Link>

          {isAdmin && (
            <>
              <Link to="payroll" className="block hover:text-gray-300">
                Payroll
              </Link>

              <Link to="communication" className="block hover:text-gray-300">
                Communication
              </Link>
              <Link to="performance" className="block hover:text-gray-300">
                Performance
              </Link>
              <Link to="all-users" className="block hover:text-gray-300">
                All Users
              </Link>
            </>
          )}
        </nav>

        <hr className="my-4 border-gray-400" />

        <Link
          to="/"
          className="inline-block bg-white text-blue-700 px-4 py-2 rounded hover:bg-gray-100 mt-6"
        >
          ← Back to Home
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoard;
