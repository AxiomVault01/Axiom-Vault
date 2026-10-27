import api from "./Axios";

export interface TeamMember {
  id: string | number;
  full_name: string;
  email: string;
  role: string;
  phone_number?: string;
  is_active: boolean;
  date_joined?: string;
  created_at?: string;
}

export type TeamMemberUpdate = Partial<
  Pick<TeamMember, "full_name" | "email" | "role" | "phone_number">
>;

const TEAM_MEMBERS_URL = "/team/members/";
const memberUrl = (id: TeamMember["id"]) => `${TEAM_MEMBERS_URL}${id}/`;

// The backend may wrap payloads (DRF pagination or a { data } envelope),
// so unwrap whichever shape comes back.
const unwrap = (data: any) => data?.data ?? data;

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const members: TeamMember[] = [];
  const visitedPages = new Set<string>();
  let nextPage: string | null = TEAM_MEMBERS_URL;

  while (nextPage) {
    if (visitedPages.has(nextPage)) {
      throw new Error("The team members API returned a repeated page link.");
    }
    visitedPages.add(nextPage);

    const res = await api.get(nextPage);
    const body = unwrap(res.data);
    if (Array.isArray(body)) {
      members.push(...body);
      break;
    }
    if (!Array.isArray(body?.results)) {
      throw new Error("The team members API returned an invalid list response.");
    }

    members.push(...body.results);
    nextPage = typeof body.next === "string" ? body.next : null;
  }

  return members;
};

export const getTeamMember = async (
  id: TeamMember["id"],
): Promise<TeamMember> => {
  const res = await api.get(memberUrl(id));
  return unwrap(res.data);
};

export const updateTeamMember = async (
  id: TeamMember["id"],
  payload: TeamMemberUpdate,
): Promise<TeamMember> => {
  const res = await api.patch(memberUrl(id), payload);
  return unwrap(res.data);
};

export const deactivateTeamMember = async (id: TeamMember["id"]) => {
  const res = await api.post(`${memberUrl(id)}deactivate/`);
  return res.data;
};

export const reactivateTeamMember = async (id: TeamMember["id"]) => {
  const res = await api.post(`${memberUrl(id)}reactivate/`);
  return res.data;
};

// Flips a member's active state and returns the member with the new status
export const toggleTeamMemberStatus = async (
  member: TeamMember,
): Promise<TeamMember> => {
  if (member.is_active) {
    await deactivateTeamMember(member.id);
  } else {
    await reactivateTeamMember(member.id);
  }
  return { ...member, is_active: !member.is_active };
};

export const getErrorMessage = (err: any, fallback: string) =>
  err?.response?.data?.message ||
  err?.response?.data?.detail ||
  err?.message ||
  fallback;
