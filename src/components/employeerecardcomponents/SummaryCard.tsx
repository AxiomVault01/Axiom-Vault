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
    <div className="bg-white border rounded-xl p-5 flex items-center gap-4 shadow-sm dark:bg-white/[0.03] dark:border-gray-700 dark:text-white w-[300px]">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${bg}`}
      >
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-semibold">{value}</h3>
        <p className="text-sm text-gray-500 dark:text-white">{label}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
