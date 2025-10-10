import react from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAttendance() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    time: "",
    location: "",
    audience: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex w-full flex-col  bg-[#0f1322] text-white">
      <h1 className="text-4xl w-full bg-[#0c1227] font-bold left-px p-6">Special Event Attendance</h1>       
      <div className="w-2/3 p-6">
        <div className="rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Create Special Event</h2>
          <p className="text-sm text-gray-400 mb-6">
            Fill in details before launching the QR scanner for attendance.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <div className="max-w-xl">
            <div className="text-gray-700">Event Name</div>
            <input
              type="text"
              name="eventName"
              placeholder="e.g. Mass, Seminar, Convocation"
              value={formData.eventName}
              onChange={handleChange}
              className="w-full rounded-md border outline-none border-gray-600 bg-white px-3 py-2 text-sm "
            />

            
            <div className="flex w-full gap-4">

            <div className="w-1/2">
            <div className="text-gray-700 mb-2">Date</div>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="flex-1 rounded-md border w-full border-gray-600 bg-white px-3 py-2 text-sm "
                />
                </div>

                <div className="w-1/2">
              <div className="text-gray-700 mb-2">Time</div>
                <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="flex-1 rounded-md w-full border border-gray-600 bg-white px-3 py-2 text-sm "
                />
                </div>
            </div>

            
            <div className="text-gray-700 mb-2">Location</div>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-md outline-none border border-gray-600 bg-white px-3 py-2 text-sm "
            />

            
            <div className="text-gray-700 mb-2">Target Audience</div>
            <input
              type="text"
              name="audience"
              placeholder="e.g. All Students, Faculty of Science"
              value={formData.audience}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-white px-3 py-2 text-sm "
              />
            </div>

            
            <div className="text-gray-700 mb-2">Notes(optional)</div>
            <textarea
              name="notes"
              placeholder="Notes (Optional)"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-white px-3 py-2 text-sm "
            />

            
            <div className="flex justify-start gap-4 pt-4 mt-12 pl-4">
              <button
                type="button"
                className="px-8 py-3 text-gray-200 font-semibold rounded-md bg-gray-500 hover:bg-gray-800 transition"
              >
                Cancel
              </button>
              <button
              onClick={()=>navigate('/attendance/scan')}
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
export default CreateAttendance