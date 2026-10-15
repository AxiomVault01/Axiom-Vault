import { User, Mail, Phone, Building, Shield } from "lucide-react";

const PersonalInfo = () => {
   const user = localStorage.getItem("user");
   const userData = user ? JSON.parse(user) : null;
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border dark:bg-white/[0.03] dark:border-gray-700 dark:text-white">
      <h3 className="font-semibold text-lg mb-6">Personal Information</h3>

      <div className="space-y-6">
        <Info
          icon={<User size={18} />}
          label="Full Name"
          value={userData?.full_name || "Guest User"}
        />
        <Info
          icon={<Mail size={18} />}
          label="Email Address"
          value={userData?.email || "randomuser@pimjo.com"} 
        />
        <Info
          icon={<Phone size={18} />}
          label="Phone Number"
          value={userData?.phone_number || "+234 803 456 7890"}
        />
        <Info
          icon={<Building size={18} />}
          label="Department"
          value={userData?.department || "Internal Audit Division"}
        />
        <Info icon={<Shield size={18} />} label="Role" value={userData?.account_type || "Senior Auditor"} />
      </div>
    </div>
  );
};

const Info = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 rounded-lg bg-brand-500 flex items-center justify-center text-white">
      {icon}
    </div>

    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default PersonalInfo;
