const Badge = ({
  text,
  variant,
  icon,
}: {
  text: string;
  variant: "red" | "green" | "yellow" | "orange" | "red1";
  icon?: React.ReactNode;
}) => {
  const styles = {
    red1: "text-red-600",
    red: "bg-red-100 text-red-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <>
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1   ${styles[variant]}`}
      >
        {icon && <span className="flex items-center">{icon}</span>}
        {text}
      </span>
      
    </>
  );
};

export default Badge;
