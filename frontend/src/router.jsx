// src/router.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import Login from "../pages/Login";
import AdminDashboard from "../pages/admins/AdminDasboard";
import LecturerDashboard from "../pages/lecturers/Dashboard";
import SpecialAttendace from "../pages/admins/super/SpecialAttendance";
import StudentDashboard from "../pages/students/Dashboard";
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
    path: "/admin/special",
    element: <SpecialAttendace />,
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
