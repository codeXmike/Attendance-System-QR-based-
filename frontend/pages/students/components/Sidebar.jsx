import React from "react";
import { useAuth } from "../../../context/AuthContext";

const Sidebar = ({ activePage, setActivePage }) => {
    const user = useAuth();
    console.log("User", user)
    return(
  <div className="w-64 bg-[#111827] p-5 flex flex-col justify-between">
    <div>
      <div className="bg-[#1f2937] rounded-2xl p-4 text-center mb-6">
        <div className="bg-[#374151] rounded-full w-16 h-16 mx-auto flex items-center justify-center text-xl font-semibold">
          MK
        </div>
        <p className="mt-2 text-white font-medium">{user.user.name}</p>
        <p className="text-gray-400 text-sm">Computer Science – 300 Level</p>
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
);
}
export default Sidebar;
