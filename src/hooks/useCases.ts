import { keepPreviousData } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCaseComment,
  assignCase,
  attachCaseEvidence,
  CaseAssignmentPayload,
  CaseEscalationPayload,
  CaseReportFormat,
  CaseStatusPayload,
  createCaseFromAlerts,
  downloadCaseReport,
  escalateCase,
  getCase,
  getCaseComments,
  getCaseEvidence,
  getCaseHistory,
  getCaseReport,
  getCases,
  removeCaseEvidence,
  updateCaseStatus,
} from "../services/CasesAPI";

const caseKeys = {
  all: ["fraud-cases"] as const,
  lists: () => [...caseKeys.all, "list"] as const,
  list: (page: number) => [...caseKeys.lists(), page] as const,
  detail: (reference: string) => [...caseKeys.all, "detail", reference] as const,
  comments: (reference: string) => [...caseKeys.all, "comments", reference] as const,
  evidence: (reference: string) => [...caseKeys.all, "evidence", reference] as const,
  history: (reference: string) => [...caseKeys.all, "history", reference] as const,
  report: (reference: string) => [...caseKeys.all, "report", reference] as const,
};

const LIVE = {
  staleTime: 5 * 100 * 60, // 5 minutes
  gcTime: 10 * 1000 * 60, // 10 minutes
  refetchInterval: 15_000,
  // Keep showing the current data while a new filter/page loads
  placeholderData: keepPreviousData,
};

export const useCases = (page = 1) =>
  useQuery({
    queryKey: caseKeys.list(page),
    queryFn: () => getCases(page),
    ...LIVE,
  });

export const useCase = (reference: string) =>
  useQuery({
    queryKey: caseKeys.detail(reference),
    queryFn: () => getCase(reference),
    enabled: Boolean(reference),
    ...LIVE,
  });

export const useCaseComments = (reference: string) =>
  useQuery({
    queryKey: caseKeys.comments(reference),
    queryFn: () => getCaseComments(reference),
    enabled: Boolean(reference),
    ...LIVE,
  });

export const useCaseEvidence = (reference: string) =>
  useQuery({
    queryKey: caseKeys.evidence(reference),
    queryFn: () => getCaseEvidence(reference),
    enabled: Boolean(reference),
    ...LIVE,
  });

export const useCaseHistory = (reference: string) =>
  useQuery({
    queryKey: caseKeys.history(reference),
    queryFn: () => getCaseHistory(reference),
    enabled: Boolean(reference),
    ...LIVE,
  });

// The report is generated on request, so it is not polled like the live case data
export const useCaseReport = (reference: string, enabled = true) =>
  useQuery({
    queryKey: caseKeys.report(reference),
    queryFn: () => getCaseReport(reference),
    enabled: Boolean(reference) && enabled,
  });

export const useDownloadCaseReport = (reference: string) =>
  useMutation({
    mutationFn: (format: CaseReportFormat) => downloadCaseReport(reference, format),
  });

const useRefreshCase = (reference?: string) => {
  const queryClient = useQueryClient();
  return async () => {
    if (reference) {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: caseKeys.detail(reference) }),
        queryClient.invalidateQueries({ queryKey: caseKeys.comments(reference) }),
        queryClient.invalidateQueries({ queryKey: caseKeys.evidence(reference) }),
        queryClient.invalidateQueries({ queryKey: caseKeys.history(reference) }),
      ]);
    }
    await queryClient.invalidateQueries({ queryKey: caseKeys.lists() });
  };
};

export const useCreateCaseFromAlerts = () => {
  const refreshCase = useRefreshCase();
  return useMutation({
    mutationFn: createCaseFromAlerts,
    onSuccess: refreshCase,
  });
};

export const useAssignCase = (reference: string) => {
  const refreshCase = useRefreshCase(reference);
  return useMutation({
    mutationFn: (payload: CaseAssignmentPayload) => assignCase(reference, payload),
    onSuccess: refreshCase,
  });
};

export const useAddCaseComment = (reference: string) => {
  const refreshCase = useRefreshCase(reference);
  return useMutation({
    mutationFn: (text: string) => addCaseComment(reference, text),
    onSuccess: refreshCase,
  });
};

export const useEscalateCase = (reference: string) => {
  const refreshCase = useRefreshCase(reference);
  return useMutation({
    mutationFn: (payload: CaseEscalationPayload) => escalateCase(reference, payload),
    onSuccess: refreshCase,
  });
};

export const useAttachCaseEvidence = (reference: string) => {
  const refreshCase = useRefreshCase(reference);
  return useMutation({
    mutationFn: (fileId: string) => attachCaseEvidence(reference, fileId),
    onSuccess: refreshCase,
  });
};

export const useRemoveCaseEvidence = (reference: string) => {
  const refreshCase = useRefreshCase(reference);
  return useMutation({
    mutationFn: (evidenceId: string) => removeCaseEvidence(reference, evidenceId),
    onSuccess: refreshCase,
  });
};

export const useUpdateCaseStatus = (reference: string) => {
  const refreshCase = useRefreshCase(reference);
  return useMutation({
    mutationFn: (payload: CaseStatusPayload) => updateCaseStatus(reference, payload),
    onSuccess: refreshCase,
  });
};
