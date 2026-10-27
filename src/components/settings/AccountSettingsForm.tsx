import { useEffect, useState } from "react";
import { Loader, User } from "lucide-react";
import toast from "react-hot-toast";
import Card from "./Card";
import Input from "./Input";
import { useMe, useUpdateMe } from "../../hooks/useMe";
import { MyProfile } from "../../services/profile";
import { getErrorMessage } from "../../services/teamMembers";

const emptyForm = { full_name: "", department: "", phone_number: "" };

// "super_admin" -> "Super Admin"
const formatLabel = (value?: string) =>
  (value ?? "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const organisationName = (org: MyProfile["organisation"]) =>
  typeof org === "string" ? org : org?.name ?? "";

const AccountSettingsForm = () => {
  const meQuery = useMe();
  const updateMutation = useUpdateMe();
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!meQuery.data) return;
    setForm({
      full_name: meQuery.data.full_name ?? "",
      department: meQuery.data.department ?? "",
      phone_number: meQuery.data.phone_number ?? "",
    });
  }, [meQuery.data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim()) {
      toast.error("Full name is required");
      return;
    }
    try {
      await updateMutation.mutateAsync({
        full_name: form.full_name.trim(),
        department: form.department.trim(),
        phone_number: form.phone_number.trim(),
      });
      toast.success("Profile updated");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update profile"));
    }
  };

  const me = meQuery.data;

  return (
    <Card className="dark:bg-white/[0.03] dark:border-gray-700">
      <div className="flex items-start gap-3 mb-6">
        <div className="bg-brand-500/10 p-2 rounded-lg">
          <User className="w-5 h-5 text-brand-500 dark:text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Account Settings
          </h2>
          <p className="text-sm text-gray-500">Update your personal information</p>
        </div>
      </div>

      {meQuery.isLoading ? (
        <p className="py-6 text-center text-sm text-gray-500">Loading profile...</p>
      ) : meQuery.isError ? (
        <div className="py-6 text-center">
          <p role="alert" className="text-sm text-red-500">Could not load your profile.</p>
          <button
            type="button"
            onClick={() => meQuery.refetch()}
            className="mt-2 text-sm font-semibold text-brand-600 hover:underline"
          >
            Retry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Full Name" name="full_name" value={form.full_name} onChange={handleChange} />
            <Input label="Department" name="department" value={form.department} onChange={handleChange} />
            <Input
              label="Phone Number"
              name="phone_number"
              type="tel"
              placeholder="+234 803 123 4567"
              value={form.phone_number}
              onChange={handleChange}
            />
            <Input label="Email Address" value={me?.email ?? ""} disabled />
            <Input label="Role" value={formatLabel(me?.role)} disabled />
            <Input label="Account Type" value={formatLabel(me?.account_type)} disabled />
            <Input label="Organisation" value={organisationName(me?.organisation ?? null)} disabled />
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Email and role are managed by your workspace super admin. Contact
            AxiomVault support to change organisation details.
          </p>

          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="mt-6 inline-flex items-center gap-2 bg-brand-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {updateMutation.isPending && <Loader size={16} className="animate-spin" />}
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}
    </Card>
  );
};

export default AccountSettingsForm;
