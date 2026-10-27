import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  DEFAULT_SUMMARY_DAYS,
  HeatmapPeriod,
  SummaryDays,
  getDashboardHeatmap,
  getDashboardSummary,
  getDashboardTrends,
  getInvestigationQueue,
} from "../services/DashboardDataAPI";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  summary: (days: SummaryDays) =>
    [...dashboardKeys.all, "summary", days] as const,
  heatmap: (period: HeatmapPeriod) =>
    [...dashboardKeys.all, "heatmap", period] as const,
  queue: (page: number) => [...dashboardKeys.all, "queue", page] as const,
  trends: () => [...dashboardKeys.all, "trends"] as const,
};

// Keep the dashboard in sync with the backend while the page is open.
const LIVE = {
  staleTime: 5 * 100 * 60, // 5 minutes
  refetchInterval: 15_000,
  // Keep showing the current data while a new filter/page loads
  placeholderData: keepPreviousData,
};

const useDashboardStats = (
  days: SummaryDays = DEFAULT_SUMMARY_DAYS,
  enabled = true,
) =>
  useQuery({
    queryKey: dashboardKeys.summary(days),
    queryFn: () => getDashboardSummary(days),
    enabled,
    ...LIVE,
  });

export const useDashboardHeatmap = (period: HeatmapPeriod) =>
  useQuery({
    queryKey: dashboardKeys.heatmap(period),
    queryFn: () => getDashboardHeatmap(period),
    ...LIVE,
  });

export const useInvestigationQueue = (page: number) =>
  useQuery({
    queryKey: dashboardKeys.queue(page),
    queryFn: () => getInvestigationQueue(page),
    ...LIVE,
  });

export const useDashboardTrends = () =>
  useQuery({
    queryKey: dashboardKeys.trends(),
    queryFn: getDashboardTrends,
    ...LIVE,
  });

export default useDashboardStats;
