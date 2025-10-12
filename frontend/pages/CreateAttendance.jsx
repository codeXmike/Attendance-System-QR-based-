// src/pages/CreateAttendance.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { useAuth } from "../context/AuthContext"; // assuming you store user info here

function CreateAttendance() {
  const navigate = useNavigate();
  const { createSession } = useSession();
  const { user } = useAuth(); // get logged-in lecturer/admin info

  const [formData, setFormData] = useState({
    session_name: "",
    session_type: "Event", // default
    location: "Goodluck Jonathan Convocation Arena",
    audience: "All Students",
    notes: "",
  });

  const locationOptions = [
    "Goodluck Jonathan Convocation Arena",
    "Peter Mbah Law Auditorium",
    "UGWUOMU Convocation Arena",
    "SAM 002",
    "SAM 003",
    "Other",
  ];

  const audienceOptions = [
    "All Students",
    "Faculty of Science",
    "Faculty of Arts",
    "Faculty of Engineering",
    "Lecturers Only",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ match backend schema
    const payload = {
      session_name: formData.session_name,
      session_type: "Event",
      created_by: user?._id,
      created_by_model: user?.role === "admin" ? "Admin" : "Lecturer",
      metadata: {
        location: formData.location,
        audience: formData.audience,
        notes: formData.notes,
      },
    };

    try {
      await createSession(payload);
      navigate("/attendance/scan");
    } catch (err) {
      console.error("Failed to create session:", err);
    }
  };

  return (
    <div className="min-h-screen flex w-full flex-col bg-[#0f1322] text-white">
      <h1 className="text-4xl w-full bg-[#0c1227] font-bold p-6">
        Create Attendance Sssion
      </h1>

      <div className="w-2/3 p-6">
        <div className="rounded-lg p-8 shadow-lg bg-[#11172b]">
          <p className="text-sm text-gray-400 mb-6">
            Fill in details before launching the QR scanner for attendance.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <div className="max-w-xl">
              <div className="text-gray-300 mb-1">Event Name</div>
              <input
                type="text"
                name="session_name"
                placeholder="e.g. Mass, Seminar, Convocation"
                value={formData.session_name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-600 bg-white px-3 py-2 text-sm"
                required
              />

              <div className="mt-4 text-gray-300 mb-1">Location</div>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-600 bg-white px-3 py-2 text-sm"
                required
              >
                <option value="">Select location</option>
                {locationOptions.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>

              <div className="mt-4 text-gray-300 mb-1">Target Audience</div>
              <select
                name="audience"
                value={formData.audience}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-600 bg-white px-3 py-2 text-sm"
                required
              >
                <option value="">Select audience</option>
                {audienceOptions.map((aud) => (
                  <option key={aud} value={aud}>
                    {aud}
                  </option>
                ))}
              </select>

              <div className="mt-4 text-gray-300 mb-1">Notes (optional)</div>
              <textarea
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Extra information about the event"
                className="w-full rounded-md border border-gray-600 bg-white px-3 py-2 text-sm"
              />
            </div>

            <div className="flex justify-start gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-8 py-3 text-gray-200 font-semibold rounded-md bg-gray-500 hover:bg-gray-800 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 text-white font-semibold rounded-md bg-gradient-to-r from-blue-400 to-blue-800 hover:opacity-90 transition"
              >
                Start Scanning
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAttendance;
