interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

const Select = ({ label, children, ...props }: SelectProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        {...props}
        className="h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white"
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
