// src/router.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import LecturerLogin from "../pages/lecturers/Login";
import LecturerDashboard from "../pages/lecturers/Dashboard";
import StudentDashboard from "../pages/students/Dashboard";
import StudentLogin from "../pages/students/Login";

const router = createBrowserRouter([
  {
    path: "/lecturer/login",
    element: <LecturerLogin />,
  },
  {
    path: "/lecturer/dashboard",
    element: <LecturerDashboard />,
  },
  {
    path: "/student/login",
    element: <StudentLogin />,
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
