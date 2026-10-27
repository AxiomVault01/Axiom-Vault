import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function MemberEmptyState({ icon: Icon, title, description }: Props) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-white/[0.03]">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400">
        <Icon size={28} strokeWidth={1.8} />
      </div>
      <h2 className="mb-2 text-base font-semibold text-gray-900 dark:text-gray-200">{title}</h2>
      <p className="max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}
