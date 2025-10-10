import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { QrCode, Bell } from "lucide-react";

// 🔹 Dynamic Chart Component (auto-updates weekly)
function DynamicAttendanceChart() {
  const [chartData, setChartData] = React.useState([
    { week: "Wk 1", attendance: 90 },
    { week: "Wk 2", attendance: 92 },
    { week: "Wk 3", attendance: 95 },
  ]);

  React.useEffect(() => {
    // Updates every real week (for testing use 5000 ms)
    const interval = setInterval(() => {
      setChartData((prev) => {
        const nextWeek = `Wk ${prev.length + 1}`;
        const lastAttendance = prev[prev.length - 1].attendance;
        // Small variation in attendance
        const newAttendance = Math.min(
          100,
          Math.max(80, lastAttendance + (Math.random() * 6 - 3))
        );
        return [
          ...prev.slice(-11),
          { week: nextWeek, attendance: newAttendance.toFixed(1) },
        ];
      });
    }, 1000 * 60 * 60 * 24 * 7); // once per real week

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-56">
      <LineChart
        width={500}
        height={200}
        data={chartData}
        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
      >
        <Line
          type="monotone"
          dataKey="attendance"
          stroke="#10b981"
          strokeWidth={3}
          dot={{ fill: "#10b981", r: 4 }}
        />
        <CartesianGrid stroke="#374151" />
        <XAxis dataKey="week" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip />
      </LineChart>
    </div>
  );
}

const data = [
  { week: "Wk 1", attendance: 100 },
  { week: "Wk 2", attendance: 90 },
  { week: "Wk 3", attendance: 100 },
];

function StudentDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  const attendanceRecords = [
    {
      course: "CSC301 — Operating Systems",
      date: "Sep 10, 2025",
      time: "10:00 AM",
      location: "LT2",
      status: "Present",
    },
    {
      course: "CSC305 — Database Systems",
      date: "Sep 12, 2025",
      time: "2:00 PM",
      location: "LT4",
      status: "Present",
    },
    {
      course: "CSC307 — Artificial Intelligence",
      date: "Sep 14, 2025",
      time: "12:00 PM",
      location: "LT1",
      status: "Absent",
    },
    {
      course: "CSC309 — Computer Networks",
      date: "Sep 16, 2025",
      time: "8:00 AM",
      location: "LT3",
      status: "Present",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0d14] text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#111827] p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-gray-400 text-lg font-semibold mb-6">Student</h2>

          <div className="bg-[#1f2937] rounded-2xl p-4 text-center mb-6">
            <div className="bg-[#374151] rounded-full w-16 h-16 mx-auto flex items-center justify-center text-xl font-semibold">
              MK
            </div>
            <p className="mt-2 text-white font-medium">Michael Okonkwo</p>
            <p className="text-gray-400 text-sm">
              Computer Science – 300 Level
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            {[
              "Dashboard",
              "Attendance Records",
              "Courses",
              "QR Code",
              "Events",
              "Settings",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setActivePage(item)}
                className={`text-left py-2 px-3 rounded-lg hover:bg-[#1f2937] transition ${
                  activePage === item ? "bg-[#1f2937]" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">
        {activePage === "Dashboard" && (
          <>
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <input
                type="text"
                placeholder="Search courses, lecturers or sessions"
                className="bg-[#1f2937] p-2 rounded-lg w-80 text-sm outline-none placeholder-gray-400"
              />
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="bg-[#1f2937] text-center py-6 rounded-2xl shadow-lg">
                <p className="text-gray-400">Total Classes</p>
                <h2 className="text-3xl font-bold mt-1">42</h2>
              </div>

              <div className="bg-[#1f2937] text-center py-6 rounded-2xl shadow-lg">
                <p className="text-gray-400">Classes Attended</p>
                <h2 className="text-3xl font-bold mt-1">42</h2>
              </div>

              <div className="bg-[#1f2937] text-center py-6 rounded-2xl shadow-lg">
                <p className="text-gray-400">Attendance %</p>
                <h2 className="text-3xl font-bold text-green-400 mt-1">100%</h2>
              </div>
            </div>

            {/* Chart + Upcoming */}
            <div className="grid grid-cols-3 gap-6">
              {/* 🔹 Dynamic weekly updating chart */}
              <div className="bg-[#1f2937] col-span-1 md:col-span-2 rounded-2xl p-4">
                <h3 className="text-lg mb-4 font-semibold">
                  Attendance Trend (Auto-updating Weekly)
                </h3>
                <DynamicAttendanceChart />
              </div>

              <div className="bg-[#1f2937] rounded-2xl p-4">
                <h3 className="text-lg mb-4 font-semibold">Upcoming Sessions</h3>
                <div className="space-y-3">
                  <div className="bg-[#111827] p-3 rounded-lg">
                    <p className="font-medium">CSC301 – Operating Systems</p>
                    <p className="text-sm text-gray-400">
                      Mon, Sep 15 • 10:00 AM - 11:00
                    </p>
                  </div>
                  <div className="bg-[#111827] p-3 rounded-lg">
                    <p className="font-medium">CSC303 – Database Systems</p>
                    <p className="text-sm text-gray-400">
                      Tue, Sep 16 • 1:00 PM - 1:45
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code + Notifications */}
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
        )}

        {activePage === "Attendance Records" && (
          <>
            <h1 className="text-2xl font-bold mb-1">Attendance Records</h1>
            <p className="text-gray-400 mb-6">
              View and filter your attendance history
            </p>

            <input
              type="text"
              placeholder="Search course, date or lecturer"
              className="bg-[#1f2937] p-2 rounded-lg w-full text-sm outline-none placeholder-gray-400 mb-6"
            />

            <div className="bg-[#1f2937] rounded-2xl p-4">
              <div className="grid grid-cols-5 text-gray-400 border-b border-gray-700 pb-2 mb-3 text-sm">
                <p>Course</p>
                <p>Date</p>
                <p>Time</p>
                <p>Location</p>
                <p>Status</p>
              </div>

              {attendanceRecords.map((record, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 py-2 border-b border-[#111827] text-sm items-center hover:bg-[#111827] transition"
                >
                  <p>{record.course}</p>
                  <p>{record.date}</p>
                  <p>{record.time}</p>
                  <p>{record.location}</p>
                  <p
                    className={`font-semibold ${
                      record.status === "Present"
                        ? "text-green-400"
                        : record.status === "Absent"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {record.status}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 text-gray-400 mt-4">
              <button className="bg-[#1f2937] px-3 py-1 rounded-md">1</button>
              <button className="hover:text-white transition">2</button>
              <button className="hover:text-white transition">3</button>
            </div>

            <div className="bg-[#1f2937] rounded-2xl p-4 mt-6 text-sm">
              <h3 className="text-gray-400 mb-3">Attendance Summary</h3>
              <div className="flex justify-between text-gray-300">
                <p>
                  Total Classes: <span className="text-white font-medium">43</span>
                </p>
                <p>
                  Present: <span className="text-green-400 font-medium">42</span>
                </p>
                <p>
                  Late: <span className="text-yellow-400 font-medium">0</span>
                </p>
                <p>
                  Absent: <span className="text-red-400 font-medium">1</span>
                </p>
              </div>
              <p className="mt-2 text-[#60a5fa] font-semibold">
                Attendance Rate: 99.8%
              </p>
            </div>
          </>
        )}

        {/* ✅ QR Code Page remains intact */}
        {activePage === "QR Code" && (
          <>
            <h1 className="text-2xl font-bold mb-2">Your QR Code</h1>
            <p className="text-gray-400 mb-6">
              Present this QR at gates or event check-ins. Keep it private.
            </p>

            <div className="grid grid-cols-3 gap-6">
              {/* Active QR */}
              <div className="bg-[#1f2937] p-6 rounded-2xl col-span-2">
                <h3 className="text-lg font-semibold mb-4">Active QR</h3>
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-[#0b0d14] p-4 rounded-2xl">
                    <QrCode size={200} className="text-green-400" />
                  </div>
                  <p className="mt-3 text-gray-400 text-sm">
                    Matric: **********
                  </p>
                  <div className="flex gap-4 mt-3">
                    <button className="bg-[#374151] px-4 py-1 rounded-md hover:bg-[#4b5563] transition">
                      Download
                    </button>
                    <button className="bg-[#374151] px-4 py-1 rounded-md hover:bg-[#4b5563] transition">
                      Share
                    </button>
                    <button className="text-blue-400 text-sm hover:underline">
                      Regenerate
                    </button>
                  </div>
                </div>
              </div>

              {/* Status + Tips */}
              <div className="space-y-4">
                <div className="bg-[#1f2937] p-4 rounded-2xl">
                  <h4 className="font-semibold mb-2">QR Status</h4>
                  <p className="text-green-400 font-medium">Active</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Expires: Sep 17, 2025 • 12:00 PM
                    <br />
                    Last used: Sep 17, 2025 • 08:03 AM (Gate A)
                  </p>
                </div>

                <div className="bg-[#1f2937] p-4 rounded-2xl">
                  <h4 className="font-semibold mb-2">Security Tips</h4>
                  <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
                    <li>Don’t share your QR publicly.</li>
                    <li>Regenerate QR if you suspect misuse.</li>
                    <li>Contact Registry for discrepancies.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Session QR Info */}
            <div className="bg-[#1f2937] mt-6 p-4 rounded-2xl">
              <p className="font-semibold text-gray-300 mb-1">Session QR</p>
              <p className="text-gray-400 text-sm">
                Enable session-based QR (valid per lecture):{" "}
                <span className="text-green-400 font-medium">Enabled</span>
              </p>
            </div>

            <p className="text-gray-500 text-xs mt-3">
              Last synced: Sep 17, 2025 • 08:05 (Africa/Lagos)
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
