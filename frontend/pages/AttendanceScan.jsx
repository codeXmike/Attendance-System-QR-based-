import React from "react";
import { Trash2, Usb } from "lucide-react";

const ScanPage = () => {
  const students = [
    { id: 1, name: "Adaeze N.", matric: "GOU/U24/CSC/1267", time: "10:02 AM" },
    { id: 2, name: "Kelechi A.", matric: "GOU/U24/CSC/1267", time: "10:03 AM" },
    { id: 3, name: "Michael E.", matric: "GOU/U24/CSC/1267", time: "10:04 AM" },
    { id: 4, name: "John M.", matric: "GOU/U24/CSC/1267", time: "10:05 AM" },
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-10 py-10 font-[Inter]">
      {/* Header */}
      <h1 className="text-3xl font-semibold mb-2">
        <span className="text-white">Scan</span>{" "}
        <span className="text-gray-400 text-2xl">
          – CS101 • Intro to Software Eng • 11 Sep 2025 • Lecture Hall A
        </span>
      </h1>

      <div className="flex flex-row md:flex-row gap-8 mt-10">
        {/* Left: Ongoing Attendance */}
        <div className="flex-1 bg-[#111827] border border-[#1f2937] rounded-2xl p-6 shadow">
          <h2 className="font-semibold mb-5 text-white">Ongoing Attendance</h2>
          <div className="flex justify-center items-center bg-black/60 rounded-lg h-72 border border-[#1f2937] flex-col">
            <div className="bg-[#1a1f2e] px-4 py-1 rounded-full mb-3 text-sm font-medium text-gray-300">
              ● MODE: USB 2D SCANNER
            </div>
            <Usb className="h-14 w-14 text-gray-400" />
          </div>

          <div className="flex justify-between mt-8">
            <button className="px-6 py-2 rounded-full border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition">
              Cancel
            </button>
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 font-medium transition">
              Finish & Submit
            </button>
          </div>
        </div>

        {/* Right: Live Attendance */}
        <div className="flex-[1.5] bg-[#111827] border border-[#1f2937] rounded-2xl p-6 shadow">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-semibold text-white">Live Attendance</h2>
            <span className="text-gray-400 text-sm">
              Scanned: <span className="text-white font-semibold">0</span>
            </span>
          </div>

          <p className="text-gray-400 text-sm mb-4">
            Updates instantly as students are scanned.
          </p>

          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="text-left py-2 w-[5%]">#</th>
                <th className="text-left py-2 w-[35%]">Students</th>
                <th className="text-left py-2 w-[40%]">Matric</th>
                <th className="text-left py-2 w-[20%]">Time</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, index) => (
                <tr
                  key={s.id}
                  className="border-b border-gray-800 last:border-none text-gray-200"
                >
                  <td className="py-3">{index + 1}.</td>
                  <td className="py-3">{s.name}</td>
                  <td className="py-3">{s.matric}</td>
                  <td className="py-3 flex items-center gap-2">
                    {s.time}
                    <span className="h-2 w-2 bg-green-400 rounded-full"></span>
                  </td>
                  <td className="py-3">
                    <button className="text-gray-400 hover:text-red-400 transition">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 rounded-full border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition">
              Export Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanPage;
