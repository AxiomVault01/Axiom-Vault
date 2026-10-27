import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  Calendar,
  Loader,
  Mail,
  Pencil,
  Phone,
  UserCheck,
  UserCog,
  UserX,
} from "lucide-react";
import toast from "react-hot-toast";
import Card from "../../components/settings/Card";
import EditTeamMemberModal from "../../components/team/EditTeamMemberModal";
import TeamMemberStatusBadge from "../../components/team/TeamMemberStatusBadge";
import { getErrorMessage } from "../../services/teamMembers";
import {
  useTeamMember,
  useToggleTeamMemberStatus,
} from "../../hooks/useTeamMembers";

const cardClass = "dark:bg-white/[0.03] dark:border-gray-700";

export default function TeamMemberDetails() {
  const { id } = useParams();
  const { data: member, isPending, error } = useTeamMember(id);
  const toggleStatus = useToggleTeamMemberStatus();
  const [editing, setEditing] = useState(false);
  const toggling = toggleStatus.isPending;

  const handleToggleStatus = () => {
    if (!member) return;
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

  const backLink = (
    <Link
      to="/settings"
      className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-500"
    >
      <ArrowLeft className="w-4 h-4" />
      Back to Settings
    </Link>
  );

  if (isPending && id) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        <Loader className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="space-y-6">
        {backLink}
        <Card className={cardClass}>
          <p className="text-sm text-center text-red-500">
            {error
              ? getErrorMessage(error, "Failed to load team member")
              : "Team member not found"}
          </p>
        </Card>
      </div>
    );
  }

  const joined = member.date_joined || member.created_at;
  const details = [
    { icon: Mail, label: "Email Address", value: member.email },
    { icon: Phone, label: "Phone Number", value: member.phone_number || "—" },
    { icon: UserCog, label: "Role", value: member.role },
    {
      icon: Calendar,
      label: "Date Added",
      value: joined ? new Date(joined).toLocaleDateString() : "—",
    },
  ];

  return (
    <div className="w-full mx-auto space-y-6">
      {backLink}

      <Card className={cardClass}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-500/10 text-brand-500 text-lg font-semibold">
              {member.full_name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {member.full_name}
                </h1>
                <TeamMemberStatusBadge active={member.is_active} />
              </div>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setEditing(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-700 dark:text-gray-200"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleToggleStatus}
              disabled={toggling}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white disabled:opacity-60 ${
                member.is_active ? "bg-red-600" : "bg-emerald-600"
              }`}
            >
              {toggling ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : member.is_active ? (
                <UserX className="w-4 h-4" />
              ) : (
                <UserCheck className="w-4 h-4" />
              )}
              {member.is_active ? "Deactivate" : "Reactivate"}
            </button>
          </div>
        </div>
      </Card>

      <Card className={cardClass}>
        <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
          Member Information
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {details.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-white/5">
                <Icon className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs uppercase text-gray-500">{label}</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <EditTeamMemberModal
        member={editing ? member : null}
        onClose={() => setEditing(false)}
      />
    </div>
  );
}
