interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
}

const Toggle = ({ enabled, onChange }: ToggleProps) => {
  return (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
        enabled ? "bg-[#2D91D1]" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          enabled ? "translate-x-6" : ""
        }`}
      />
    </button>
  );
};

export default Toggle;
