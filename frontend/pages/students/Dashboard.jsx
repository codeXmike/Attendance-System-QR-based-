import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardOverview from "./components/DashboardOverview";
import AttendanceRecords from "./components/AttendanceRecords";
import QRCodePage from "./components/QRCodePage";

const StudentDashboard = () => {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-[#0b0d14] text-white flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 p-8">
        {activePage === "Dashboard" && <DashboardOverview />}
        {activePage === "Attendance Records" && <AttendanceRecords />}
        {activePage === "QR Code" && <QRCodePage />}
      </div>
    </div>
  );
};

export default StudentDashboard;
