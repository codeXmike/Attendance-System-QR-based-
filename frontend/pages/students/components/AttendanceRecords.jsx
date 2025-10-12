const AttendanceRecords = () => {
  const mockData = [
    { name: "Emeka", date: "2025-10-10", status: "Present" },
    { name: "Ada", date: "2025-10-09", status: "Absent" },
  ];

  return (
    <div className="p-6 bg-gray-800 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b pb-2">Name</th>
            <th className="border-b pb-2">Date</th>
            <th className="border-b pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((record, idx) => (
            <tr key={idx}>
              <td className="py-2">{record.name}</td>
              <td>{record.date}</td>
              <td className={`${record.status === "Present" ? "text-green-400" : "text-red-400"}`}>
                {record.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AttendanceRecords;
