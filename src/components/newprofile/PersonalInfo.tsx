import { User, Mail, Phone, Building, Shield } from "lucide-react";

const PersonalInfo = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <h3 className="font-semibold text-lg mb-6">Personal Information</h3>

      <div className="space-y-6">
        <Info
          icon={<User size={18} />}
          label="Full Name"
          value="Sarah Anderson"
        />
        <Info
          icon={<Mail size={18} />}
          label="Email Address"
          value="sarah.anderson@rcc.gov"
        />
        <Info
          icon={<Phone size={18} />}
          label="Phone Number"
          value="+234 803 456 7890"
        />
        <Info
          icon={<Building size={18} />}
          label="Department"
          value="Internal Audit Division"
        />
        <Info icon={<Shield size={18} />} label="Role" value="Senior Auditor" />
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
    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
      {icon}
    </div>

    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default PersonalInfo;
