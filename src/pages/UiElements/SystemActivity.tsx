import { AlertCircle, CheckCircle2, Upload, UserCog } from "lucide-react";


export const SystemActivity = () => {
    const Activity = [
        {
            id: 1,
            icon: <AlertCircle size={16} />,
            time: "2 min ago",
            label: "Alert generated",
            iconBg: "bg-red-100 text-red-500",
            description: "Critical anomaly detected in vendor payment system",

        },
        {
            id: 2,
            icon: <UserCog size={16} />,
            time: "13 min ago",
            label: "Case Assigned",
            iconBg: "bg-blue-100 text-blue-500",
            description: "Investigation assigned to Serah Chan",

        },
        {
            id: 3,
            icon: <Upload size={16} />,
            time: "2 min ago",
            label: "Evidence Uploaded",
            iconBg: "bg-purple-100 text-purple-500",
            description: "Payment records and approval logs added to case",

        },
        {
            id: 4,
            icon: <CheckCircle2 size={16} />,
            time: "2 min ago",
            label: "Case Resolved",
            iconBg: "bg-green-100 text-green-500",
            description: "Duplicate payment investigation closed - vendor refund initiated",

        },


    ];

    return (
        <div className="xl:max-w-100 lg:w-full rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-white/3 md:p-5 h-fit">
            {/* Title */}
            <h3 className="mb-1 text-[18px] font-semibold text-gray-900 dark:text-white/90">
                System Activity
            </h3>
            <div className=" flex itens-center justify-between text-xs dark:text-white">
                <p>Recent audit and investigation events </p>

            </div>

            {Activity.map((activity) => (
                <div key={activity.id} className="bg-white p-3 mt-5 grid grid-cols-1 gap-2 rounded-lg drop-shadow-sm dark:bg-white/3 ">

                    <div className="flex gap-2">
                        <div className={`flex items-center justify-center  text-xs w-10 h-10 rounded ${activity.iconBg}`}>
                            {activity.icon}
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <div className={`flex justify-between items-center`}>
                                <h1 className="text-sm text-gray-800 dark:text-white">{activity.label}</h1>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <h6 className="text-[10px] text-gray-500 dark:text-white">{activity.description}</h6>
                                <p className="text-[10px] text-gray-500 dark:text-white">{activity.time}</p>
                            </div>
                            
                        </div>
                    </div>

                </div>
            ))}
            <div className="flex justify-center">
                <button className="mt-5 text-center text-[10px] text-blue-700 font-medium cursor-pointer dark:text-white">View Full Activity Log...</button>
            </div>
        </div>
    );
};


