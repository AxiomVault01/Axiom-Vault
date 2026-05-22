import { ChevronRight, Clock } from "lucide-react";
// import { useNavigate } from "react-router";

const Badge = ({ type, value }: { type: "level" | "mode"; value: string }) => {
    const levelStyles: Record<string, string> = {
        Critical: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200",
        High: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200",
        Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
        Low: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200",
    };

    const modeStyles: Record<string, string> = {
        "Under Review": "bg-yellow-100 text-yellow-700 dark:bg-blue-900 dark:text-blue-200",
        "Investigation Ongoing": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
        Escalated: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        "New Alert": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };

    const styles = type === "level" ? levelStyles : modeStyles;
    const badgeStyle = styles[value] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badgeStyle}`}>
            {value}
        </span>
    );
};

export const InvestigationQueues = () => {
    // const navigate = useNavigate();
    const queues = [
        {
            id: 1,
            icon: <Clock size={14} />,
            time: "12 min ago",
            label: "Duplicate vendor payment detected",
            level: "Critical",
            mode: "Under Review",
            department: "procurement",
            assignedto: "Alex R."
        },
        {
            id: 2,
            icon: <Clock size={14} />,
            time: "28 min ago",
            label: "Ghost employee in payroll system",
            level: "Critical",
            mode: "Investigation Ongoing",
            department: "HR",
            assignedto: "Arren U."
        },
        {
            id: 3,
            icon: <Clock size={14} />,
            time: "1 hour ago",
            label: "Missing approval workflow bypass",
            level: "High",
            mode: "Escalated",
            department: "Finance",
            assignedto: "Bene R."
        },
        {
            id: 4,
            icon: <Clock size={14} />,
            time: "3 hour ago",
            label: "Vendor invoice anomaly pattern",
            level: "Medium",
            mode: "New Alert",
            department: "Procurement",
            assignedto: "Alex R."
        },

    ];

    return (
        <div className="xl:max-w-100 lg:w-full rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-white/3 md:p-5 h-fit">
            {/* Title */}
            <h3 className="mb-1 text-[18px] font-semibold text-gray-900 dark:text-white/90">
                Investigation Queue
            </h3>
            <div className=" flex itens-center justify-between text-xs dark:text-white">
                <p>Active investigations requiring attention</p>
                <button className="text-red-600 flex items-center gap-1 font-medium">View All <ChevronRight size={16} /></button>
            </div>

            {queues.map((queue) => (
                <div key={queue.id} className="bg-white p-3 mt-5 grid grid-cols-1 gap-2 rounded-lg drop-shadow-sm dark:border-gray-800 dark:bg-white/3">
                    <div className={`flex justify-between items-center`}>
                        <h1 className="text-sm text-gray-800 dark:text-white">{queue.label}</h1>
                        <Badge type="level" value={queue.level} />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-700">
                        <p className="flex items-center gap-2 dark:text-white">{queue.icon} {queue.time}</p>
                        <p className="dark:text-white">{queue.department}</p>

                    </div>
                    <div className="flex items-center justify-between gap-3 text-xs text-gray-700 mt-7">
                        <Badge type="mode" value={queue.mode} />
                        <p className="font-normal dark:text-white">Assigned To: {queue.assignedto}</p>

                    </div>

                </div>
            ))}

        </div>
    );
};


