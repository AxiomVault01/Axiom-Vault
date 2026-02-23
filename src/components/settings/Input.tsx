interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className="h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
      />
    </div>
  );
};

export default Input;
