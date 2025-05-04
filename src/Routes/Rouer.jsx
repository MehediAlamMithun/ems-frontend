import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import Main from "../Layouts/Main";
import Login from "../Login/Login";
import Register from "../Login/Register";
import DashBoard from "../DashBoard/DashBoard";
import Profile from "../DashBoard/Profile";
import DashboardHome from "../DashBoard/DashBoardHome";
import Attendance from "../DashBoard/Attendance";
import Payroll from "../DashBoard/PayRoll";
import Communication from "../DashBoard/Communication";
import AllUsers from "../DashBoard/AllUsers";
import PrivateRoute from "../Routes/PrivateRoute"; // ✅ Import this
import Performance from "../DashBoard/Performance";
import Feedback from "../DashBoard/Feedback";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "profile", element: <Profile /> },
      { path: "attendance", element: <Attendance /> },
      { path: "feedback", element: <Feedback /> },
      

      // ✅ Admin-only routes below wrapped with PrivateRoute
      {
        path: "payroll",
        element: (
          <PrivateRoute>
            <Payroll />
          </PrivateRoute>
        ),
      },
      {
        path: "performance",
        element: (
          <PrivateRoute>
            <Performance />
          </PrivateRoute>
        ),
      },
      {
        path: "communication",
        element: (
          <PrivateRoute>
            <Communication />
          </PrivateRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <PrivateRoute>
            <AllUsers />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
