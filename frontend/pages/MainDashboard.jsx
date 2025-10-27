import { Navigate } from "react-router-dom";

export const MainDashboard = ({ role }) => (
  <Navigate to={`/${role}/dashboard`} replace />
);
