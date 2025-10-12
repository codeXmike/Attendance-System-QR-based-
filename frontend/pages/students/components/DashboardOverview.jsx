import React from "react";
import { QrCode, Bell } from "lucide-react";
import DynamicAttendanceChart from "./DynamicAttendanceChart";
import StatsCard from "./StatsCard";

const DashboardOverview = () => (
  <>
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <input
        type="text"
        placeholder="Search courses, lecturers or sessions"
        className="bg-[#1f2937] p-2 rounded-lg w-80 text-sm outline-none placeholder-gray-400"
      />
    </div>

    <div className="grid grid-cols-3 gap-6 mb-6">
      <StatsCard label="Total Classes" value="42" />
      <StatsCard label="Classes Attended" value="42" />
      <StatsCard label="Attendance %" value="100%" color="text-green-400" />
    </div>

    <div className="bg-[#1f2937] rounded-2xl p-4 mb-6">
      <h3 className="text-lg mb-4 font-semibold">
        Attendance Trend (Auto-updating Weekly)
      </h3>
      <DynamicAttendanceChart />
    </div>

    <div className="grid grid-cols-2 gap-6 mt-6">
      <div className="bg-[#1f2937] rounded-2xl p-4 flex flex-col items-center justify-center">
        <h3 className="text-lg mb-4 font-semibold">Your QR Code</h3>
        <div className="bg-white p-2 rounded-lg">
          <QrCode size={180} className="text-black" />
        </div>
        <p className="text-gray-400 text-sm mt-3">
          Last Synced: Sept 13, 2025 (GDS Lab)
        </p>
      </div>

      <div className="bg-[#1f2937] rounded-2xl p-4">
        <h3 className="text-lg mb-4 font-semibold flex items-center gap-2">
          <Bell size={18} /> Notifications
        </h3>
        <div className="bg-[#111827] p-3 rounded-lg mb-3">
          <p>Attendance for CSC301 recorded — Sept 13, 2025</p>
          <p className="text-sm text-gray-400">
            Semester VI • Sept 29, 2025 • 100% recorded
          </p>
        </div>
      </div>
    </div>
  </>
);

export default DashboardOverview;
