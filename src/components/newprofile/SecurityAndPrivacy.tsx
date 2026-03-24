
export default function SecurityAndPrivacy({title, description, className}: {title: string, description: string, className?: string}) {
  return (
    <section className={`bg-white rounded-lg shadow-sm p-5 w-full dark:bg-white/[0.03] dark:border-gray-700 dark:text-white border-gray-200 border cursor-pointer ${className || ''}`}>
        <div>
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <p className="text-gray-500 dark:text-white mb-4">
                {description}
            </p>

        </div>
    </section>
  )
}
