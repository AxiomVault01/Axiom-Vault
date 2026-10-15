import { useState } from "react";
import { Link } from "react-router";
import { Eye, Loader, Pencil, UserCheck, UserX } from "lucide-react";
import toast from "react-hot-toast";
import EditTeamMemberModal from "./EditTeamMemberModal";
import TeamMemberStatusBadge from "./TeamMemberStatusBadge";
import { TeamMember, getErrorMessage } from "../../services/teamMembers";
import {
  useTeamMembers,
  useToggleTeamMemberStatus,
} from "../../hooks/useTeamMembers";

const actionClass =
  "inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed";

export default function TeamMembersList() {
  const { data: members = [], isPending, error, refetch } = useTeamMembers();
  const toggleStatus = useToggleTeamMemberStatus();
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const busyId = toggleStatus.isPending ? toggleStatus.variables?.id : null;

  const handleToggleStatus = (member: TeamMember) => {
    const action = member.is_active ? "deactivate" : "reactivate";
    if (!window.confirm(`Are you sure you want to ${action} ${member.full_name}?`))
      return;

    toggleStatus.mutate(member, {
      onSuccess: () =>
        toast.success(
          `${member.full_name} ${member.is_active ? "deactivated" : "reactivated"}`,
        ),
      onError: (err) =>
        toast.error(getErrorMessage(err, `Failed to ${action} team member`)),
    });
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-10 text-gray-500">
        <Loader className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-red-500">
          {getErrorMessage(error, "Failed to load team members")}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-3 text-sm font-medium text-brand-500"
        >
          Try again
        </button>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <p className="py-8 text-sm text-center text-gray-500">
        No team members yet. Add a colleague to get started.
      </p>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-xs uppercase text-gray-500 border-b border-gray-200 dark:border-gray-700">
              <th className="py-3 pr-4 font-medium">Name</th>
              <th className="py-3 pr-4 font-medium">Role</th>
              <th className="py-3 pr-4 font-medium hidden md:table-cell">
                Phone
              </th>
              <th className="py-3 pr-4 font-medium">Status</th>
              <th className="py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="py-3 pr-4">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {member.full_name}
                  </p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                </td>
                <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">
                  {member.role}
                </td>
                <td className="py-3 pr-4 text-gray-700 dark:text-gray-300 hidden md:table-cell">
                  {member.phone_number || "—"}
                </td>
                <td className="py-3 pr-4">
                  <TeamMemberStatusBadge active={member.is_active} />
                </td>
                <td className="py-3">
                  <div className="flex justify-end gap-2 text-gray-600 dark:text-gray-300">
                    <Link
                      to={`/team-members/${member.id}`}
                      title="View"
                      className={actionClass}
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setEditing(member)}
                      title="Edit"
                      className={actionClass}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(member)}
                      disabled={busyId === member.id}
                      title={member.is_active ? "Deactivate" : "Reactivate"}
                      className={`${actionClass} ${
                        member.is_active ? "text-red-600" : "text-emerald-600"
                      }`}
                    >
                      {busyId === member.id ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : member.is_active ? (
                        <UserX className="w-4 h-4" />
                      ) : (
                        <UserCheck className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditTeamMemberModal
        member={editing}
        onClose={() => setEditing(null)}
      />
    </>
  );
}
