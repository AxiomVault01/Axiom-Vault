interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-2 ">
      <label className="text-sm font-medium text-gray-700 dark:text-white">
        {label}
      </label>
      <input
        {...props}
        className="h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D91D1] focus:border-[#2D91D1] text-sm dark:text-white"
      />
    </div>
  );
};

export default Input;
