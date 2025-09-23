// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import {useEffect} from "react";
import { RouterProvider } from "react-router-dom";
import App from "./App";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    
  },
]);

export default function AppRouter() {
    useEffect(() => {
      document.title = "QR | Attendance System";
    }, []);
  
    return <RouterProvider router={router} />;
  }
