const StatsCard = ({ label, value, color = "text-white" }) => (
  <div className="bg-[#1f2937] text-center py-6 rounded-2xl shadow-lg">
    <p className="text-gray-400">{label}</p>
    <h2 className={`text-3xl font-bold mt-1 ${color}`}>{value}</h2>
  </div>
);

export default StatsCard;
