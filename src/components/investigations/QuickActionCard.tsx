import { LucideIcon } from "lucide-react";

interface QuickActionProps {
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  description: string;
  buttonText: string;
}

export default function QuickActionCard({
  icon: Icon,
  iconColor = "", 
  title,
  description,
  buttonText,
}: QuickActionProps) {
  return (
    <div className="rounded-xl border border-stroke bg-white p-6 shadow-sm dark:border-strokedark dark:bg-boxdark">
      <div className="mb-4 flex justify-center">
        <div className="rounded-full bg-gray-100 p-3">
          <Icon size={22} className={iconColor} />
        </div>
      </div>

      <h3 className="text-center font-semibold text-black dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-center text-sm text-gray-500">
        {description}
      </p>

      <button
        className="mt-5 flex w-full items-center text-orange-500 justify-center gap-2 text-sm font-medium text-primary hover:underline">
        {buttonText}
        →
      </button>
    </div>
  );
}