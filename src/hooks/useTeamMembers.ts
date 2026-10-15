import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  TeamMember,
  TeamMemberUpdate,
  getTeamMember,
  getTeamMembers,
  toggleTeamMemberStatus,
  updateTeamMember,
} from "../services/teamMembers";

export const teamMemberKeys = {
  all: ["teamMembers"] as const,
  list: () => [...teamMemberKeys.all, "list"] as const,
  detail: (id: TeamMember["id"]) =>
    [...teamMemberKeys.all, "detail", String(id)] as const,
};

export const useTeamMembers = () =>
  useQuery({
    queryKey: teamMemberKeys.list(),
    queryFn: getTeamMembers,
  });

export const useTeamMember = (id?: TeamMember["id"]) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: teamMemberKeys.detail(id ?? ""),
    queryFn: () => getTeamMember(id!),
    enabled: id !== undefined && id !== "",
    // Show the row from the cached list right away while the detail loads
    placeholderData: () =>
      queryClient
        .getQueryData<TeamMember[]>(teamMemberKeys.list())
        ?.find((m) => String(m.id) === String(id)),
  });
};

// Writes a changed member into both the list and detail caches
const useSyncMember = () => {
  const queryClient = useQueryClient();
  return (updated: TeamMember) => {
    queryClient.setQueryData<TeamMember[]>(teamMemberKeys.list(), (prev) =>
      prev?.map((m) => (m.id === updated.id ? updated : m)),
    );
    queryClient.setQueryData(teamMemberKeys.detail(updated.id), updated);
  };
};

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();
  const syncMember = useSyncMember();
  return useMutation({
    mutationFn: async ({
      member,
      payload,
    }: {
      member: TeamMember;
      payload: TeamMemberUpdate;
    }) => {
      const updated = await updateTeamMember(member.id, payload);
      // Fall back to merging locally if the API doesn't echo the record
      return updated?.id ? updated : { ...member, ...payload };
    },
    onSuccess: (updated) => {
      syncMember(updated);
      queryClient.invalidateQueries({ queryKey: teamMemberKeys.all });
    },
  });
};

export const useToggleTeamMemberStatus = () => {
  const queryClient = useQueryClient();
  const syncMember = useSyncMember();
  return useMutation({
    mutationFn: toggleTeamMemberStatus,
    onSuccess: (updated) => {
      syncMember(updated);
      queryClient.invalidateQueries({ queryKey: teamMemberKeys.all });
    },
  });
};
