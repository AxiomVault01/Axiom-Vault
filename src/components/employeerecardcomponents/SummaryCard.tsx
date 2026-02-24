const SummaryCard = ({
  icon,
  value,
  label,
  bg,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  bg: string;
}) => {
  return (
    <div className="bg-white border rounded-xl p-5 flex items-center gap-4 shadow-sm">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${bg}`}
      >
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-semibold">{value}</h3>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
