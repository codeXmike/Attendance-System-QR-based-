import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const DynamicAttendanceChart = () => {
  const [chartData, setChartData] = React.useState([
    { week: "Wk 1", attendance: 90 },
    { week: "Wk 2", attendance: 92 },
    { week: "Wk 3", attendance: 95 },
  ]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) => {
        const nextWeek = `Wk ${prev.length + 1}`;
        const lastAttendance = prev[prev.length - 1].attendance;
        const newAttendance = Math.min(
          100,
          Math.max(80, lastAttendance + (Math.random() * 6 - 3))
        );
        return [
          ...prev.slice(-11),
          { week: nextWeek, attendance: newAttendance.toFixed(1) },
        ];
      });
    }, 1000 * 60 * 60 * 24 * 7);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-56">
      <LineChart width={500} height={200} data={chartData}>
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
};

export default DynamicAttendanceChart;
