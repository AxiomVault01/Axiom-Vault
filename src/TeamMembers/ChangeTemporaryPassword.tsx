import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { CircleCheck, Loader, Lock, User } from "lucide-react";
import toast from "react-hot-toast";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../icons";
import Label from "../components/form/Label";
import Input from "../components/form/input/InputField";
import PageMeta from "../components/common/PageMeta";
import MainImg from "../../public/Vault.jpg";
import Bicon from "../../public/Brand Icon.jpg";
import Biconw from "../../public/AXIOM_VAULT_c.png";
import api from "../services/Axios";
import { getErrorMessage } from "../services/teamMembers";

// TODO: confirm this path and payload with the backend
const CHANGE_TEMP_PASSWORD_URL = "/auth/change-password/";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

const emptyForm = {
  email: "",
  temporary_password: "",
  new_password: "",
  confirm_password: "",
};

type Field = keyof typeof emptyForm;

export default function ChangeTemporaryPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState(emptyForm);
  const [shown, setShown] = useState<Partial<Record<Field, boolean>>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const next = { ...emptyForm };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address";
    }
    if (!form.temporary_password) {
      next.temporary_password = "Enter the temporary password you were given";
    }
    if (!passwordPattern.test(form.new_password)) {
      next.new_password =
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character.";
    } else if (form.new_password === form.temporary_password) {
      next.new_password = "New password must be different from the temporary password";
    }
    if (form.new_password !== form.confirm_password) {
      next.confirm_password = "Passwords do not match";
    }
    setErrors(next);
    return Object.values(next).every((error) => !error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await api.post(CHANGE_TEMP_PASSWORD_URL, { ...form, email: form.email.trim() });
      navigate("/signin", { state: { passwordUpdated: true, email: form.email.trim() } });
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update password"));
    } finally {
      setLoading(false);
    }
  };

  const passwordField = (name: Field, label: string, placeholder: string) => (
    <div>
      <Label className="text-brand-800 dark:text-white/90">{label}</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 z-50 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <Input
          name={name}
          type={shown[name] ? "text" : "password"}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-2"
        />
        <span
          onClick={() => setShown({ ...shown, [name]: !shown[name] })}
          className="absolute right-4 top-1/2 z-30 -translate-y-1/2 cursor-pointer"
        >
          {shown[name] ? (
            <EyeIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
          ) : (
            <EyeCloseIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
          )}
        </span>
      </div>
      {errors[name] && <p className="mt-1 text-sm text-red-500">{errors[name]}</p>}
    </div>
  );

  return (
    <>
      <PageMeta title="Axiom Vault | Change Password" description="Change your temporary password." />

      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat px-4"
        style={{ backgroundImage: `url(${MainImg})` }}
      >
        <div className="mx-auto w-full max-w-md pt-8 sm:pt-10">
          <Link to="/" className="inline-flex items-center text-sm text-white hover:text-brand-200">
            <ChevronLeftIcon className="size-5" />
            Back to Home
          </Link>
        </div>

        <div className="mx-auto mt-4 w-full max-w-md pb-10">
          <div className="overflow-hidden rounded-lg border bg-white dark:border-gray-700 dark:bg-gray-900">
            <div className="bg-brand-500 p-6 text-center sm:p-8">
              <div className="mx-auto mb-3 h-12 w-12 rounded-lg bg-white p-1 dark:bg-gray-900">
                <img src={Bicon} className="mx-auto h-10 w-[30.5px] dark:hidden" alt="Brand Icon" />
                <img src={Biconw} className="mx-auto hidden h-10 w-[30.5px] dark:block" alt="Brand Icon" />
              </div>
              <h1 className="mb-2 text-xl font-semibold text-white sm:text-title-sm">
                Change your Temporary password
              </h1>
              <p className="text-sm text-brand-200">
                Creating your new password gives you full access to your workspace
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-5 sm:p-6">
              <div>
                <Label className="text-brand-800 dark:text-white/90">Work Email Address</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 z-50 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-2"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              {passwordField("temporary_password", "Temporary Password", "Enter your temporary password")}
              {passwordField("new_password", "New Password", "Create a new password")}
              {passwordField("confirm_password", "Confirm New Password", "Re-enter your new password")}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs disabled:opacity-60 dark:bg-brand-600"
              >
                {loading ? <Loader size={18} className="animate-spin" /> : <CircleCheck size={18} />}
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
