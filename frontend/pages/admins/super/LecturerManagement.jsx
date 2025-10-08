import React, { useState } from "react";
import { Trash2, UserPlus } from "lucide-react";

const LecturerManagement = () => {
  const [lecturers, setLecturers] = useState([
    { id: 1, name: "Dr. Adaobi N.", faculty: "Engineering", email: "adaobi@gou.edu.ng" },
    { id: 2, name: "Mr. Eze K.", faculty: "Science", email: "eze@gou.edu.ng" },
    { id: 3, name: "Prof. Michael E.", faculty: "Computing", email: "michael@gou.edu.ng" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    faculty: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addLecturer = () => {
    if (!formData.name || !formData.faculty || !formData.email) return;
    const newLecturer = {
      id: lecturers.length + 1,
      ...formData,
    };
    setLecturers([...lecturers, newLecturer]);
    setFormData({ name: "", faculty: "", email: "" });
  };

  const removeLecturer = (id) => {
    setLecturers(lecturers.filter((lec) => lec.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-10 py-10 font-[Inter]">
      {/* Header */}
      <h1 className="text-3xl font-semibold mb-8">
        <span className="text-white">Lecturer Management</span>{" "}
        <span className="text-gray-400">• Add and Manage Lecturers</span>
      </h1>

      <div className="flex flex-row md:flex-row gap-8">
        {/* Left: Add Lecturer */}
        <div className="flex-1 bg-[#111827] border border-[#1f2937] rounded-2xl p-6 shadow">
          <h2 className="font-semibold mb-5 text-white">Add Lecturer</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#0d1117] border border-[#1f2937] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                placeholder="e.g. Dr. Adaobi N."
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Faculty</label>
              <input
                type="text"
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                className="w-full bg-[#0d1117] border border-[#1f2937] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                placeholder="e.g. Engineering"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#0d1117] border border-[#1f2937] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                placeholder="e.g. adaobi@gou.edu.ng"
              />
            </div>

            <button
              onClick={addLecturer}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 transition font-medium"
            >
              <UserPlus className="w-4 h-4" /> Add Lecturer
            </button>
          </div>
        </div>

        {/* Right: Lecturer List */}
        <div className="flex-[1.5] bg-[#111827] border border-[#1f2937] rounded-2xl p-6 shadow">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-semibold text-white">Lecturer List</h2>
            <span className="text-gray-400 text-sm">
              Total: <span className="text-white font-semibold">{lecturers.length}</span>
            </span>
          </div>

          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="text-left py-2 w-[5%]">#</th>
                <th className="text-left py-2 w-[30%]">Name</th>
                <th className="text-left py-2 w-[25%]">Faculty</th>
                <th className="text-left py-2 w-[30%]">Email</th>
                <th className="w-[10%]"></th>
              </tr>
            </thead>
            <tbody>
              {lecturers.map((lec, index) => (
                <tr
                  key={lec.id}
                  className="border-b border-gray-800 last:border-none text-gray-200"
                >
                  <td className="py-3">{index + 1}.</td>
                  <td className="py-3">{lec.name}</td>
                  <td className="py-3">{lec.faculty}</td>
                  <td className="py-3">{lec.email}</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => removeLecturer(lec.id)}
                      className="text-gray-400 hover:text-red-400 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LecturerManagement;
