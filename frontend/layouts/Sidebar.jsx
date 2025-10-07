import { useState } from "react";
import { FaHome, FaClipboardList, FaChartLine, FaHandPointRight  } from "react-icons/fa";
import { FaChevronUp, FaChevronDown,  } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import { MdEventAvailable } from "react-icons/md";
import "./sidebar.css"
import { useNavigate } from "react-router-dom";
function Sidebar({Title, faculties, distribution}) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };
  const navigate = useNavigate()
  return (
    <div className="max-h-screen overflow-y-auto custom-scroll w-80 bg-[#0f1322] shadow-[0_1px_5px_-2px_white] sticky top-0 text-white flex flex-col p-4 space-y-4">
      <div className="flex flex-col w-full">
        <div className="self-center">
            <img src="../../services/image.png" width={160} />
        </div>
        <div className="font-bold mt-5 text-[23px]">
         {Title}
        </div>
      </div>
    <div>
      <button onClick={() => navigate('/')} className="flex w-full space-x-2 bg-white active:bg-gray-200 focus:bg-gray-400 text-black px-3 py-2 rounded-lg">
        <FaHome size={25} className="fill-black" />
        <span className="font-bold text-xl ml-4">Dashboard</span>
      </button>

    
      {distribution !== 'Never' && (<div>
        <button
          onClick={() => toggleDropdown("faculties")}
          className="flex items-center justify-between w-full px-2 py-2 hover:bg-gray-700 rounded-lg"
        >
          <span className="flex w-full space-x-2">
            <FaHome size={25} className="text-blue-400" />
            <span className="font-semibold text-xl ml-5">{distribution}</span>
          </span>
          {openDropdown === "faculties" ? <FaChevronUp size={20} className="font-semibold text-blue-400" /> : <FaChevronDown size={20} className="font-semibold text-blue-400"/>}
        </button>
        {openDropdown === "faculties" && (
          <div className="ml-20 pl-4 mt-1 space-y-1 max-h-[60px] overflow-y-auto overflow-x-hidden custom-scroll  border-l-4 rounded-bl-lg">
            {faculties.map((faculty, index) => (
            <button onClick={() => navigate(`/${distribution}`)} className="block whitespace-nowrap w-36 hover:bg-gray-700 rounded-lg px-2 hover:text-cyan-300 truncate cursor-help" title={faculty.name}>{faculty.name}</button>
            ))}
          </div>
        )}
      </div>)}

      
      <div>
        <button
          onClick={() => toggleDropdown("attendance")}
          className="flex items-center justify-between w-full px-2 py-2 hover:bg-gray-700 rounded-lg"
          >
          <span className="flex w-full space-x-2">
            <FaClipboardList size={25} className="text-blue-400" />
            <span className="font-semibold text-xl ml-5">Attendance</span>
          </span>
          {openDropdown === "attendance" ? <FaChevronUp size={20} className="font-semibold text-blue-400" /> : <FaChevronDown size={20} className="font-semibold text-blue-400"/>}
        </button>
        {openDropdown === "attendance" && (
          <div className="ml-20 pl-4 mt-1 space-y-1 max-h-[60px] overflow-y-auto custom-scroll  border-l-4 rounded-bl-lg">
            <button className="block hover:bg-gray-700 rounded-lg px-2 hover:text-cyan-300">Attendance Records</button>
            <button className="block hover:bg-gray-700 rounded-lg px-2 hover:text-cyan-300">Take Attendance</button>
          </div>
        )}
      </div>

      
      <div>
        <button
          onClick={() => toggleDropdown("students")}
          className="flex items-center justify-between w-full px-2 py-2 hover:bg-gray-700 rounded-lg"
        >
          <span className="flex w-full space-x-2">
            <PiStudentBold size={25} className="text-blue-400"  />
            <span className="font-semibold text-xl ml-5">Students</span>
          </span>
          {openDropdown === "students" ? <FaChevronUp size={20} className="font-semibold text-blue-400" /> : <FaChevronDown size={20} className="font-semibold text-blue-400"/>}
        </button>
        {openDropdown === "students" && (
          <div className="ml-20 pl-4 mt-1 max-h-[60px] overflow-y-auto custom-scroll space-y-1 border-l-4 rounded-bl-lg">           
            <button className="block hover:bg-gray-700 rounded-lg px-2 hover:text-cyan-300">Student List</button>
            <button className="block hover:bg-gray-700 rounded-lg px-2 hover:text-cyan-300">Student List</button>
          </div>
        )}
      </div>

      
      <button className="flex w-full space-x-2 px-2 py-2 hover:bg-gray-700 rounded-lg">
        <FaChartLine size={25} className="text-blue-400"/>
        <span className="font-semibold text-xl ml-5">Analytics</span>
      </button>

      
      <button className="flex w-full space-x-2 px-2 py-2 hover:bg-gray-700 rounded-lg">
        <MdEventAvailable size={25} className="text-blue-400"  />
        <span className="font-semibold text-xl ml-5">Events</span>
      </button>

      <button className="flex w-full space-x-2 px-2 py-2 hover:bg-gray-700 rounded-lg mt-auto">
        <span className="font-semibold text-xl">Logout</span>
        <FaHandPointRight size={25} className="text-blue-400" />
      </button>
    </div>
  </div>
  );
}

export default Sidebar