import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useInvestigationQueue } from "../../hooks/useDashboardData";
// import { useNavigate } from "react-router";

const Badge = ({ type, value }: { type: "level" | "mode"; value: string }) => {
    const levelStyles: Record<string, string> = {
        critical: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200",
        high: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200",
        medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
        low: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200",
    };

    const modeStyles: Record<string, string> = {
        under_review: "bg-yellow-100 text-yellow-700 dark:bg-blue-900 dark:text-blue-200",
        investigating: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
        escalated: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        new: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };

    const styles = type === "level" ? levelStyles : modeStyles;
    const badgeStyle = styles[value] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badgeStyle}`}>
            {formatLabel(value)}
        </span>
    );
};

const STATUS_LABELS: Record<string, string> = {
    new: "New Alert",
    investigating: "Investigation Ongoing",
    under_review: "Under Review",
    escalated: "Escalated",
    false_positive: "False Positive",
};

// "false_positive" -> "False Positive"
const formatLabel = (value: string) =>
    STATUS_LABELS[value] ??
    value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const timeAgo = (iso: string) => {
    const diff = Math.max(0, Date.now() - new Date(iso).getTime());
    const minutes = Math.floor(diff / 60_000);
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? "" : "s"} ago`;
};

const getPageFromLink = (link: string | null, fallback: number) => {
    if (!link) return fallback;

    const page = Number(new URL(link, window.location.href).searchParams.get("page"));
    return Number.isInteger(page) && page > 0 ? page : fallback;
};

export const InvestigationQueues = () => {
    // const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { data, isLoading, isError, isPlaceholderData } = useInvestigationQueue(page);

    const queues = data?.results ?? [];

    return (
        <div className="xl:max-w-200 lg:w-full rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-white/3 md:p-5 flex flex-col">
            {/* Title */}
            <h3 className="mb-1 text-[18px] font-semibold text-gray-900 dark:text-white/90">
                Investigation Queue
            </h3>
            <div className=" flex itens-center justify-between text-xs dark:text-white">
                <p>Active investigations requiring attention</p>
                <button className="text-red-600 flex items-center gap-1 font-medium">View All <ChevronRight size={16} /></button>
            </div>

            {isLoading || isError || queues.length === 0 ? (
                <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    {isLoading
                        ? "Loading investigations..."
                        : isError
                            ? "Couldn't load the investigation queue."
                            : "No active investigations."}
                </p>
            ) : (
                <div className={isPlaceholderData ? "opacity-60 transition-opacity" : ""}>
                    {queues.map((queue) => (
                        <div key={queue.reference} className="bg-white p-3 mt-5 grid grid-cols-1 gap-2 rounded-lg drop-shadow-sm dark:border-gray-800 dark:bg-white/3">
                            <div className={`flex justify-between items-center gap-2`}>
                                <h1 className="text-sm text-gray-800 dark:text-white">{queue.title}</h1>
                                <Badge type="level" value={queue.severity} />
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-700">
                                <p className="flex items-center gap-2 dark:text-white"><Clock size={14} /> {timeAgo(queue.detected_at)}</p>
                                <p className="dark:text-white">{queue.department}</p>
                            </div>
                            <div className="flex items-center justify-between gap-3 text-xs text-gray-700 mt-7">
                                <Badge type="mode" value={queue.status} />
                                <p className="font-normal dark:text-white">
                                    Assigned To: {queue.assigned_reviewer?.full_name ?? "Unassigned"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {data && (data.next || data.previous) && (
                <div className="mt-auto pt-5 flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                    <button
                        onClick={() => setPage((p) => getPageFromLink(data.previous, Math.max(1, p - 1)))}
                        disabled={!data.previous || isPlaceholderData}
                        className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 font-medium hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-white/3"
                    >
                        <ChevronLeft size={14} /> Previous
                    </button>
                    <span>
                        Page {page} · {data.count} total
                    </span>
                    <button
                        onClick={() => setPage((p) => getPageFromLink(data.next, p + 1))}
                        disabled={!data.next || isPlaceholderData}
                        className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 font-medium hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-white/3"
                    >
                        Next <ChevronRight size={14} />
                    </button>
                </div>
            )}
        </div>
    );
};
