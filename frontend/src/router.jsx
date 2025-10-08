// src/router.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import Login from "../pages/Login";
import AdminDashboard from "../pages/admins/AdminDasboard";
import LecturerDashboard from "../pages/lecturers/Dashboard";
import SpecialAttendace from "../pages/admins/super/SpecialAttendance";
import StudentDashboard from "../pages/students/Dashboard";
import AttendanceRecord from "../pages/AttendanceRecord";
import ScanPage from "../pages/AttendanceScan";
import LecturerManagement from "../pages/admins/super/LecturerManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/attendance/create",
    element: <SpecialAttendace />,
  },
  {
    path: "/attendance/records",
    element: <AttendanceRecord />,
  },
  {
    path: "/attendance/scan",
    element: <ScanPage />,
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
