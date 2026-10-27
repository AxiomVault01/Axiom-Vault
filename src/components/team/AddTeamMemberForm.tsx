import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import MainImg from "../../../public/Vault.jpg";
import Bicon from "../../../public/Brand Icon.jpg";
import Biconw from "../../../public/AXIOM_VAULT_c.png";
import api from "../../services/Axios";
import { useQueryClient } from "@tanstack/react-query";
import { teamMemberKeys } from "../../hooks/useTeamMembers";
import {
  Check,
  CircleCheck,
  Loader,
  Lock,
  Mail,
  Phone,
  User,
  UserCog,
} from "lucide-react";
import toast from "react-hot-toast";

// TODO: confirm the team member endpoint with the backend team
const CREATE_TEAM_MEMBER_URL = "/team/members/";

const bgImage = {
  backgroundImage: `url(${MainImg})`,
  minHeight: "100vh",
  width: "100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const BiImage = {
  width: "30.53px",
  height: "40px",
};

const emptyForm = {
  full_name: "",
  role: "",
  email: "",
  password: "",
  confirm_password: "",
  phone_number: "",
};

type FormFields = typeof emptyForm;

const iconClass =
  "absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-50";

export default function AddTeamMemberForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<FormFields>(emptyForm);
  const [errors, setErrors] = useState<FormFields>(emptyForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createdMember, setCreatedMember] = useState<FormFields | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = { ...emptyForm };

    const fullNamePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)+$/;
    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    } else if (!fullNamePattern.test(formData.full_name.trim())) {
      newErrors.full_name = "Please enter first and last name, letters only";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character.";
    }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    const phonePattern = /^\+?\d{7,15}$/;
    if (!phonePattern.test(formData.phone_number.replace(/[\s-]/g, ""))) {
      newErrors.phone_number = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        full_name: formData.full_name.trim(),
        role: formData.role.trim(),
        phone_number: formData.phone_number.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirm_password: formData.confirm_password,
      };
      const res = await api.post(CREATE_TEAM_MEMBER_URL, payload);
      toast.success(res.data?.message || "Team member created");
      queryClient.invalidateQueries({ queryKey: teamMemberKeys.all });
      setCreatedMember(formData);
    } catch (err: any) {
      const errormessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to create team member";
      toast.error(errormessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAnother = () => {
    setFormData(emptyForm);
    setErrors(emptyForm);
    setCreatedMember(null);
  };

  const passwordToggle = (shown: boolean, toggle: () => void) => (
    <span
      onClick={toggle}
      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
    >
      {shown ? (
        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
      ) : (
        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
      )}
    </span>
  );

  if (createdMember) {
    return (
      <div style={bgImage} className="flex items-center justify-center p-4">
        <div className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-900">
          <div className="h-1.5 bg-gradient-to-r from-blue-600 to-emerald-400" />
          <div className="p-6">
            <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-2xl bg-emerald-50 dark:bg-emerald-500/10">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-700">
                <Check className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="mt-4 text-2xl font-bold text-center text-brand-800 dark:text-white">
              Role Created Successfully!
            </h1>
            <p className="mt-1 text-sm text-center text-gray-500 dark:text-gray-400">
              The team member has been added.
            </p>

            <div className="p-5 mt-6 space-y-4 rounded-lg bg-blue-50 dark:bg-white/5">
              <div className="px-2 py-2 rounded bg-white/70 dark:bg-white/5">
                <p className="text-[10px] font-semibold uppercase text-gray-500">
                  Assigned Role
                </p>
                <p className="text-lg font-semibold text-brand-800 dark:text-white">
                  {createdMember.role}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-gray-500">Full Name</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {createdMember.full_name}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-gray-500">Email</p>
                <p className="font-mono text-sm text-gray-900 dark:text-white">
                  {createdMember.email}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-gray-500">
                  Phone Number
                </p>
                <p className="font-mono text-sm text-gray-900 dark:text-white">
                  {createdMember.phone_number}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <Button
                onClick={handleCreateAnother}
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium border border-gray-400 rounded-lg  dark:text-gray-100 "
              >
                Create Another Role
              </Button>
              <Button
                onClick={() => navigate("/dashboard")}
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-500 shadow-theme-xs"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={bgImage} className="flex items-center justify-center p-4">
      <div className="w-full max-w-md my-10 bg-white rounded-lg dark:bg-gray-900">
        <div className="p-8 rounded-t-lg bg-brand-500">
          <div className="w-12 h-12 p-1 mx-auto mb-3 bg-white rounded-lg dark:bg-gray-900">
            <img
              src={Bicon}
              style={BiImage}
              className="mx-auto dark:hidden"
              alt="Brand Icon"
            />
            <img
              src={Biconw}
              style={BiImage}
              className="hidden mx-auto dark:block"
              alt="Brand Icon"
            />
          </div>
          <h1 className="mb-2 font-semibold text-center text-white text-title-sm">
            Create Team Member
          </h1>
          <p className="text-sm text-center text-brand-200 dark:text-gray-200">
            Add a colleague to your AxiomVault workspace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <Label className="text-brand-800 dark:text-white/90">
              Full Name
            </Label>
            <div className="relative">
              <User className={iconClass} />
              <Input
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Juan dela Cruz"
                className="pl-10"
              />
            </div>
            {errors.full_name && (
              <p className="text-sm text-red-500">{errors.full_name}</p>
            )}
          </div>

          <div>
            <Label className="text-brand-800 dark:text-white/90">Role</Label>
            <div className="relative">
              <UserCog className={iconClass} />
              <Input
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Enter team member role"
                className="pl-10"
              />
            </div>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role}</p>
            )}
          </div>

          <div>
            <Label className="text-brand-800 dark:text-white/90">
              Email Address
            </Label>
            <div className="relative">
              <Mail className={iconClass} />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter work email"
                className="pl-10"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <Label className="text-brand-800 dark:text-white/90">
              Password
            </Label>
            <div className="relative">
              <Lock className={iconClass} />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter team member's password"
                className="pl-10 pr-12"
              />
              {passwordToggle(showPassword, () =>
                setShowPassword(!showPassword),
              )}
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div>
            <Label className="text-brand-800 dark:text-white/90">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className={iconClass} />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Enter team member's password"
                className="pl-10 pr-12"
              />
              {passwordToggle(showConfirmPassword, () =>
                setShowConfirmPassword(!showConfirmPassword),
              )}
            </div>
            {errors.confirm_password && (
              <p className="text-sm text-red-500">{errors.confirm_password}</p>
            )}
          </div>

          <div>
            <Label className="text-brand-800 dark:text-white/90">
              Phone Number
            </Label>
            <div className="relative">
              <Phone className={iconClass} />
              <Input
                type="tel"
                inputMode="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Enter Phone number"
                className="pl-10"
              />
            </div>
            {errors.phone_number && (
              <p className="text-sm text-red-500">{errors.phone_number}</p>
            )}
          </div>

          <div className="grid grid-cols-[2fr_3fr] gap-3 pt-4">
            <Link to="/signin">
              <Button
                type="button"
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium border border-gray-400 rounded-lg  dark:text-gray-100 "
              >
                Skip for now
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-500 shadow-theme-xs disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <CircleCheck size={18} />
              )}
              {loading ? "Creating..." : "Create Role"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
