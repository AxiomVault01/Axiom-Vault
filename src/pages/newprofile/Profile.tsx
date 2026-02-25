import HeaderCard from "../../components/newprofile/HeaderCard";
import StatCard from "../../components/newprofile/StatsCard";
import PersonalInfo from "../../components/newprofile/PersonalInfo";
import RecentActivity from "../../components/newprofile/RecentActivity";
import { Shield, CheckCircle, AlertCircle, FileText } from "lucide-react";

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
            bg="bg-blue-500"
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
      </main>
    </div>
  );
};

export default Profile;
