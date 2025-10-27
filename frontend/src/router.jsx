// src/router.jsx
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "../pages/Login";
import AdminDashboard from "../pages/admins/AdminDasboard";
import LecturerDashboard from "../pages/lecturers/Dashboard";
import CreateAttendance from "../pages/CreateAttendance";
import StudentDashboard from "../pages/students/Dashboard";
import AttendanceRecord from "../pages/AttendanceRecord";
import ScanPage from "../pages/AttendanceScan";
import LecturerManagement from "../pages/admins/super/LecturerManagement";
import { MainDashboard } from "../pages/MainDashboard";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  };

  const role = JSON.parse(localStorage.getItem("role") || "null");
  const router = createBrowserRouter([
  {
    path: "/",
    element: (<PrivateRoute><MainDashboard role={role} /></PrivateRoute>),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/dashboard",
    element: (<PrivateRoute><AdminDashboard /></PrivateRoute>),
  },
  {
    path: "/attendance/create",
    element: (<PrivateRoute><CreateAttendance /></PrivateRoute>),
  },
  {
    path: "/attendance/records",
    element: (<PrivateRoute><AttendanceRecord /></PrivateRoute>),
  },
  {
    path: "/attendance/scan",
    element: (<PrivateRoute><ScanPage /></PrivateRoute>),
  },
  {
    path: "/manage/lecturers",
    element: <LecturerManagement />,
  },
  {
    path: "/lecturer/dashboard",
    element: <LecturerDashboard />,
  },
  {
    path: "/student/dashboard",
    element: <StudentDashboard />,
  },
]);

export default function AppRouter() {
  useEffect(() => {
    document.title = "QR | Attendance System";
  }, []);

  return <RouterProvider router={router} />;
}
