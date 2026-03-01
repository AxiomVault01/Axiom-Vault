const StatCard = ({
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
    <div className="bg-white rounded-xl p-6 shadow-sm border dark:bg-gray-700 dark:border-gray-700 dark:text-white">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${bg}`}
      >
        {icon}
      </div>

      <h3 className="text-2xl font-semibold mt-4">{value}</h3>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  );
};

export default StatCard;
