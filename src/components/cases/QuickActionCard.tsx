import { ArrowRight, LucideIcon } from "lucide-react";

interface QuickActionProps {
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  description: string;
  buttonText: string;
  href?: string;
}

export default function QuickActionCard({
  icon: Icon,
  iconColor = "text-gray-800 dark:text-gray-200",
  title,
  description,
  buttonText,
  href,
}: QuickActionProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-6 py-6 text-center dark:border-gray-700 dark:bg-white/3">
      <div className="mb-3 flex justify-center">
        <Icon size={26} className={iconColor} />
      </div>

      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
        {description}
      </p>

      <a
        href={href}
        className="mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-[#B86C41] hover:underline underline-offset-2"
      >
        {buttonText}
        <ArrowRight size={14} />
      </a>
    </div>
  );
}
