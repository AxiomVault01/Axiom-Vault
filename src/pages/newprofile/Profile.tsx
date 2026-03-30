import HeaderCard from "../../components/newprofile/HeaderCard";
import StatCard from "../../components/newprofile/StatsCard";
import PersonalInfo from "../../components/newprofile/PersonalInfo";
import RecentActivity from "../../components/newprofile/RecentActivity";
import { Shield, CheckCircle, AlertCircle, FileText } from "lucide-react";
// import SecurityAndPrivacy from "../../components/newprofile/SecurityAndPrivacy";
import SecurityAndPrivacy from "../../components/newprofile/SecurityAndPrivacy"

function Profile () {
  return (
    <div className="min-h-screen bg-gray-100 flex dark:bg-black">
     

      <main className="flex-1 p-4 md:p-8 space-y-6">
        <HeaderCard />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<Shield size={22} />}
            value="89"
            label="Cases Investigated"
            bg="bg-brand-500"
          />
          <StatCard
            icon={<CheckCircle size={22} />}
            value="67"
            label="Cases Closed"
            bg="bg-green-500"
          />
          <StatCard
            icon={<AlertCircle size={22} />}
            value="22"
            label="Active Cases"
            bg="bg-orange-500"
          />
          <StatCard
            icon={<FileText size={22} />}
            value="145"
            label="Reports Generated"
            bg="bg-purple-500"
          />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PersonalInfo />
          </div>

          <RecentActivity />
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md dark:bg-white/[0.03] dark:border-gray-700 dark:text-white border-gray-200 border">
          <h1 className="py-8 font-semibold md:text-[28px] text-[16px] ">Security & Privacy</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-5"> 
           <SecurityAndPrivacy title="Change Password" description="Update your password for regular security." />
          <SecurityAndPrivacy title="Two-Factor Authentication" description="Add an extra layer of security to your account." />
          <SecurityAndPrivacy title="Login History" description="View your recent login activity." />
          <SecurityAndPrivacy title="Privacy Settings" description="Manage your data and privacy preferences." />
          </div>

           
        </div>
      </main>
    </div>
  );
};

export default Profile;
