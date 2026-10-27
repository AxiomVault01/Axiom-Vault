import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addAlertNote,
  AddAlertNotePayload,
  assignAlertReviewer,
  AssignAlertReviewerPayload,
  AlertFilters,
  getAlertHistory,
  getAlertNotes,
  getFraudAlert,
  getFraudAlerts,
  updateAlertStatus,
  UpdateAlertStatusPayload,
} from "../services/AlertsAPI";

const alertKeys = {
  all: ["fraud-alerts"] as const,
  list: (filters: AlertFilters) => [...alertKeys.all, "list", filters] as const,
  detail: (reference: string) =>
    [...alertKeys.all, "detail", reference] as const,
  historyAll: (reference: string) =>
    [...alertKeys.all, "history", reference] as const,
  history: (reference: string, page: number) =>
    [...alertKeys.historyAll(reference), page] as const,
  notesAll: (reference: string) =>
    [...alertKeys.all, "notes", reference] as const,
  notes: (reference: string, page: number) =>
    [...alertKeys.notesAll(reference), page] as const,
  lists: () => [...alertKeys.all, "list"] as const,
};

// Keep the dashboard in sync with the backend while the page is open.
const LIVE = {
  staleTime: 5 * 100 * 60, // 5 minutes
  refetchInterval: 15_000,
  // Keep showing the current data while a new filter/page loads
  placeholderData: keepPreviousData,
};

export const useFraudAlerts = (filters: AlertFilters, enabled = true) =>
  useQuery({
    queryKey: alertKeys.list(filters),
    queryFn: () => getFraudAlerts(filters),
    enabled,
    ...LIVE,
  });

export const useFraudAlert = (reference: string) =>
  useQuery({
    queryKey: alertKeys.detail(reference),
    queryFn: () => getFraudAlert(reference),
    enabled: Boolean(reference),
    ...LIVE,
  });

export const useAlertHistory = (reference: string, page: number) =>
  useQuery({
    queryKey: alertKeys.history(reference, page),
    queryFn: () => getAlertHistory(reference, page),
    enabled: Boolean(reference),
    ...LIVE,
  });

export const useAlertNotes = (reference: string, page: number) =>
  useQuery({
    queryKey: alertKeys.notes(reference, page),
    queryFn: () => getAlertNotes(reference, page),
    enabled: Boolean(reference),
    ...LIVE,
  });

// Mutations refresh the alert details and related history/note pages for consistency.
const useRefreshAlert = (reference: string) => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: alertKeys.detail(reference) });
    queryClient.invalidateQueries({
      queryKey: alertKeys.historyAll(reference),
    });
    queryClient.invalidateQueries({ queryKey: alertKeys.notesAll(reference) });
    queryClient.invalidateQueries({ queryKey: alertKeys.lists() });
  };
};

export const useAddAlertNote = (reference: string) => {
  const refreshAlert = useRefreshAlert(reference);
  return useMutation({
    mutationFn: (payload: AddAlertNotePayload) =>
      addAlertNote(reference, payload),
    onSuccess: refreshAlert,
  });
};

export const useAssignAlertReviewer = (reference: string) => {
  const refreshAlert = useRefreshAlert(reference);
  return useMutation({
    mutationFn: (payload: AssignAlertReviewerPayload) =>
      assignAlertReviewer(reference, payload),
    onSuccess: refreshAlert,
  });
};

export const useUpdateAlertStatus = (reference: string) => {
  const refreshAlert = useRefreshAlert(reference);
  return useMutation({
    mutationFn: (payload: UpdateAlertStatusPayload) =>
      updateAlertStatus(reference, payload),
    onSuccess: refreshAlert,
  });
};
