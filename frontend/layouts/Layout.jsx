import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { MdQrCodeScanner, MdOutlineAccessTimeFilled, MdEventAvailable } from "react-icons/md";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const Layout = ({ data, weeklyDistribution, distribution }) => {
  const navigate = useNavigate();
  const COLORS = ["orange", "cyan", "blue", "red", "yellow", "green"];

  return (
    <main className="min-h-screen flex-1 w-full bg-[#0f1322] text-white p-6">
      {/* HEADER */}
      <header className="p-4 flex justify-between rounded-xl items-center mb-6">
        <h1 className="text-3xl font-semibold">Overview</h1>
        <div className="text-sm text-gray-400 text-end">
          Attendance Rate:{" "}
          <span className="text-white font-semibold">{data.attendanceRate}%</span>
          <div>....monitor and manage attendance data</div>
        </div>
      </header>

      {/* STAT CARDS */}
      <section className="grid grid-cols-3 gap-20 mb-6">
        <article className="p-3 border border-white rounded-2xl shadow flex flex-col items-center">
          <FaUsers size={40} className="text-blue-400 mb-2" />
          <p className="text-2xl font-bold">{data.totalStudents}</p>
          <p className="text-gray-400 text-sm">Total Students</p>
        </article>

        <article className="p-3 border border-white rounded-2xl shadow flex flex-col items-center">
          <MdQrCodeScanner size={40} className="text-blue-400 mb-2" />
          <p className="text-2xl font-bold">{data.scansToday}</p>
          <p className="text-gray-400 text-sm">Scans Today</p>
        </article>

        <article className="p-3 border border-white rounded-2xl shadow flex flex-col items-center">
          <MdOutlineAccessTimeFilled size={40} className="text-red-400 mb-2" />
          <p className="text-2xl font-bold">{data.pendingIssues}</p>
          <p className="text-gray-400 text-sm">Pending Issues</p>
        </article>
      </section>

      {/* SPECIAL EVENT */}
      <section className="bg-[#0f1322] flex justify-center mb-8 p-7 border-gray-400">
        <div className="px-20 py-10 rounded-4xl border-gray-400 shadow-[0_0_5px_-2px_white]">
          <button
            onClick={() => navigate('/SpecialAttendance')}
            className="bg-white text-black font-bold text-2xl inline-flex hover:bg-gray-400 active:bg-gray-700 px-8 py-3 rounded-2xl"
          >
            <MdEventAvailable size={75} className="text-black mr-4" />
            <span className="break-words w-40 text-start">Create A Special Event</span>
          </button>
        </div>
      </section>

      {/* WEEKLY TREND */}
      <section className="bg-[#111827] rounded-2xl shadow p-4 px-14 mb-20 border border-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Weekly Attendance Trend</h2>
          <button className="text-gray-400 font-semibold">View Report</button>
        </div>

        <div className="flex justify-center items-center border border-white rounded-2xl text-gray-500">
          <div className="w-11/12 h-72 justify-center">
            <ResponsiveContainer>
              <LineChart data={weeklyDistribution}>
                <CartesianGrid strokeDasharray="4 6" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* FACULTY DISTRIBUTION */}
      <section className="bg-[#111827] rounded-2xl shadow p-4 px-14 mb-20 border border-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Faculty Distribution</h2>
          <button className="text-gray-400 font-semibold">View Details</button>
        </div>

        <div className="flex justify-center items-center h-80 border border-white rounded-2xl text-gray-500">
          <PieChart width={600} height={320}>
            <Pie
              data={distribution}
              dataKey="studentCount"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {distribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </section>

      {/* RECENT ACTIVITY */}
      <section className="bg-[#111827] rounded-2xl border border-white shadow p-4">
        <h2 className="font-semibold text-2xl mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          {[
            "MAT 101 Attendance Submitted",
            "VCS 345 Attendance Submitted",
            "CSC 334 Attendance Submitted",
          ].map((activity, i) => (
            <li key={i} className="flex items-center space-x-3">
              <FaCircleCheck size={20} className="text-green-400" />
              <span className="w-full">{activity}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FOOTER */}
      <footer className="mt-8 text-center text-gray-500 text-xs">
        © 2025 TEAM CODE GEARS. All rights reserved.
      </footer>
    </main>
  );
};

export default Layout;
