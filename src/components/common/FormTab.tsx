import { useState } from "react";

const FormTab: React.FC = () => {
  const [selected, setSelected] = useState<
    "optionOne" | "optionTwo" | "optionThree" | "optionFour"
  >("optionOne");

  const getButtonClass = (option: "optionOne" | "optionTwo" | "optionThree" | "optionFour") =>
    selected === option
      ? "shadow-theme-xs text-white dark:text-white bg-brand-500 dark:bg-brand-500"
      : "text-gray-800 dark:text-white border border-gray-300 dark:border-gray-800";

  return (
    <div className="flex items-center gap-0.5 rounded-lg p-0.5 dark:bg-white/[0.03]">
      <button
        onClick={() => setSelected("optionOne")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm ${getButtonClass(
          "optionOne"
        )}`}
      >
        Week
      </button>

      <button
        onClick={() => setSelected("optionTwo")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm ${getButtonClass(
            "optionTwo"   
        )}`}
      >
        Month
      </button>

      <button
        onClick={() => setSelected("optionThree")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm ${getButtonClass(
          "optionThree"
        )}`}
      >
        Quarter
        
      </button>

      <button
        onClick={() => setSelected("optionFour")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm  ${getButtonClass(
          "optionFour"
        )}`}
      >
        Year
        
      </button>
    </div>
  );
};

export default FormTab;
