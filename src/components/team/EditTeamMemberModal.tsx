import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { Modal } from "../ui/modal";
import Input from "../settings/Input";
import {
  TeamMember,
  TeamMemberUpdate,
  getErrorMessage,
} from "../../services/teamMembers";
import { useUpdateTeamMember } from "../../hooks/useTeamMembers";

interface EditTeamMemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

const toForm = (member: TeamMember | null) => ({
  full_name: member?.full_name ?? "",
  email: member?.email ?? "",
  role: member?.role ?? "",
  phone_number: member?.phone_number ?? "",
});

export default function EditTeamMemberModal({
  member,
  onClose,
}: EditTeamMemberModalProps) {
  const [formData, setFormData] = useState<Required<TeamMemberUpdate>>(
    toForm(member),
  );
  const [error, setError] = useState("");
  const updateMember = useUpdateTeamMember();
  const saving = updateMember.isPending;

  useEffect(() => {
    setFormData(toForm(member));
    setError("");
  }, [member]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;

    if (!formData.full_name.trim() || !formData.role.trim()) {
      setError("Full name and role are required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    const payload = {
      full_name: formData.full_name.trim(),
      email: formData.email.trim(),
      role: formData.role.trim(),
      phone_number: formData.phone_number.trim(),
    };
    updateMember.mutate(
      { member, payload },
      {
        onSuccess: () => {
          toast.success("Team member updated");
          onClose();
        },
        onError: (err) =>
          toast.error(getErrorMessage(err, "Failed to update team member")),
      },
    );
  };

  return (
    <Modal
      isOpen={!!member}
      onClose={onClose}
      className="max-w-lg p-6 mx-4 sm:p-8"
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Edit Team Member
      </h2>
      <p className="mb-6 text-sm text-gray-500">
        Update this team member's information
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
        <Input
          label="Phone Number"
          name="phone_number"
          type="tel"
          value={formData.phone_number}
          onChange={handleChange}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-700 dark:text-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-brand-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium disabled:opacity-60"
          >
            {saving && <Loader className="w-4 h-4 animate-spin" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
