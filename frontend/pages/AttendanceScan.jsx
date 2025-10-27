import React, { useEffect, useRef, useState } from "react";
import { Trash2, Usb } from "lucide-react";
import { useSession } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";

const ScanPage = () => {
  const navigate = useNavigate();
  const { session, endSession, scanStudent } = useSession();
  const [students, setStudents] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    if (!session) {
      navigate("/"); // redirect if no session
    }
  }, [session, navigate]);

  useEffect(() => {
    const keepFocus = () => {
      if (inputRef.current && document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
    };
    keepFocus();
    window.addEventListener("focus", keepFocus);
    const interval = setInterval(keepFocus, 500);
    return () => {
      window.removeEventListener("focus", keepFocus);
      clearInterval(interval);
    };
  }, []);


const decryptPayload = async (payload) => {
  try {
    const res = await scanStudent(payload);
    console.log(res);
    if (!res.status == 200) throw new Error("Failed to decrypt");
    const data = await res.data;
    console.log("Data", data)
    return {
      student: data,
      student_id: data.student_id,
      status: "Present",
      recorded_at: new Date().toISOString(),
      scan_method: "2D Scanner",
      metadata: { location: "Main Gate", device_id: "SCN-01" },
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

  useEffect(() => {
  if (!session) return;

  const simulatedPayloads = [
    { ciphertext: "vE9n2RWva2ChRBpeZU3qkQ==", iv: "Ag2yydZETn5j163u", authTag: "HBdg7bMpgk+GIJqFgognnw==" },
    { ciphertext: "A08DegSFINfH+n2UCfm3Nw==", iv: "sXxp+xzANW5lWUPy", authTag: "gHzo/APegxoGqwsx5zTmVA==" },
  ];

  simulatedPayloads.forEach((payload, i) => {
    setTimeout(async () => {
      const id = Date.now() + i;
      setStudents(prev => [
        ...prev,
        { id, decrypting: true, cipher: payload.ciphertext, iv: payload.iv },
      ]);

      const data = await decryptPayload(payload);
      if (!data) return;

      setStudents(prev =>
        prev.map(s =>
          s.id === id ? { ...s, ...data, decrypting: false } : s
        )
      );
    }, i * 1250);

  });
}, [session]);


  const handleDelete = (key) => {
    const copy = [...students];
    copy.splice(key, 1);
    setStudents(copy);
  };

  const handleSubmit = async () => {
    if (!session) return;
    await endSession(session._id, students);
    navigate("/attendance/records");
  };

  // 🔹 Conditional rendering: show nothing or loader until session loads
  if (!session) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
        <p className="text-gray-400 text-lg">
          No active session. Redirecting...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-10 py-10 font-[Inter] relative">
      <input
        ref={inputRef}
        type="text"
        className="absolute opacity-0 pointer-events-none"
        autoFocus
      />

      <h1 className="text-3xl font-semibold mb-2">
        <span className="text-white">Scan</span>{" "}
        <span className="text-gray-400 text-2xl">
          – {session.session_name} • {session.session_type}
        </span>
      </h1>

      <div className="flex flex-row md:flex-row gap-8 mt-10">
        {/* Left Panel */}
        <div className="flex-1 bg-[#111827] border border-[#1f2937] rounded-2xl p-6 shadow">
          <h2 className="font-semibold mb-5 text-white">Ongoing Attendance</h2>
          <div className="flex justify-center items-center bg-black/60 rounded-lg h-72 border border-[#1f2937] flex-col">
            <div className="bg-[#1a1f2e] px-4 py-1 rounded-full mb-3 text-sm font-medium text-gray-300">
              ● MODE: USB 2D SCANNER
            </div>
            <Usb className="h-14 w-14 text-gray-400" />
          </div>

          <div className="flex justify-between mt-8">
            <button
              className="px-6 py-2 rounded-full border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition"
              onClick={() => navigate("/sessions")}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 font-medium transition"
            >
              Finish & Submit
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-[1.5] bg-[#111827] border border-[#1f2937] rounded-2xl p-6 shadow">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-semibold text-white">Live Attendance</h2>
            <span className="text-gray-400 text-sm">
              Scanned:{" "}
              <span className="text-white font-semibold">
                {students.length}
              </span>
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
                  key={index}
                  className="border-b border-gray-800 last:border-none text-gray-200"
                >
                  <td className="py-3">{index + 1}.</td>
                  <td className="py-3">
                    {s.decrypting ? (
                      <span className="text-gray-500 italic">
                        Decrypting...
                      </span>
                    ) : (
                      s.student?.name
                    )}
                  </td>
                  <td className="py-3">
                    {s.decrypting ? (
                      <span className="text-gray-500 italic">---</span>
                    ) : (
                      s.student?.matricNo
                    )}
                  </td>
                  <td className="py-3 flex items-center gap-2">
                    {s.decrypting
                      ? "..."
                      : new Date(s.recorded_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                    {!s.decrypting && (
                      <span className="h-2 w-2 bg-green-400 rounded-full"></span>
                    )}
                  </td>
                  <td className="py-3">
                    {!s.decrypting && (
                      <button
                        className="text-gray-400 hover:text-red-400 transition"
                        onClick={() => handleDelete(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
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
