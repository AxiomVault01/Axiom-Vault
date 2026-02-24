import { useState } from "react";
import Card from "../../components/settings/Card";
import Input from "../../components/settings/Input";
import Select from "../../components/settings/Select";
import Toggle from "../../components/settings/Toggle";
import { User, Bell } from "lucide-react";

function Settings() {
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [highRiskAlerts, setHighRiskAlerts] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);
  const [systemUpdates, setSystemUpdates] = useState(true);

  return (
    <div className="min-h-screen  ">
      <div className="w-full mx-auto space-y-6">
        {/* Page Header */}
        <Card>
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account and application preferences
          </p>
        </Card>

        {/* Account Settings */}
        <Card>
          <div className="flex items-start gap-3 mb-6">
            <div className="bg-[#2D91D1]/10 p-2 rounded-lg">
              <User className="w-5 h-5 text-[#2D91D1]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Account Settings
              </h2>
              <p className="text-sm text-gray-500">
                Update your personal information
              </p>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Full Name" defaultValue="Senior Auditor" />
            <Input label="Email Address" defaultValue="auditor@agency.gov" />
            <Input label="Department" defaultValue="Internal Audit" />

            <Select label="Role" defaultValue="Senior Auditor">
              <option>Senior Auditor</option>
              <option>Junior Auditor</option>
              <option>Administrator</option>
            </Select>
          </div>

          <button className="mt-6 bg-[#2D91D1] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#2D91D1]/90 transition-all duration-300">
            Save Changes
          </button>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <div className="flex items-start gap-3 mb-6">
            <div className="bg-orange-50 p-2 rounded-lg dark:bg-gray-400">
              <Bell className="w-5 h-5 text-orange-500 dark:text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-500">
                Notification Preferences
              </h2>
              <p className="text-sm text-gray-500">
                Choose how you want to be notified
              </p>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {/* Critical Risk */}
            <div className="flex items-center justify-between py-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Critical Risk Alerts
                </h3>
                <p className="text-sm text-gray-500">
                  Get notified about critical fraud detection
                </p>
              </div>
              <Toggle
                enabled={criticalAlerts}
                onChange={() => setCriticalAlerts(!criticalAlerts)}
              />
            </div>

            {/* High Risk */}
            <div className="flex items-center justify-between py-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  High Risk Alerts
                </h3>
                <p className="text-sm text-gray-500">
                  Notifications for high priority cases
                </p>
              </div>
              <Toggle
                enabled={highRiskAlerts}
                onChange={() => setHighRiskAlerts(!highRiskAlerts)}
              />
            </div>

            {/* Daily Summary */}
            <div className="flex items-center justify-between py-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Daily Summary Reports
                </h3>
                <p className="text-sm text-gray-500">
                  Receive daily email summaries
                </p>
              </div>
              <Toggle
                enabled={dailySummary}
                onChange={() => setDailySummary(!dailySummary)}
              />
            </div>

            {/* System Updates */}
            <div className="flex items-center justify-between py-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  System Updates
                </h3>
                <p className="text-sm text-gray-500">
                  Platform updates and maintenance notices
                </p>
              </div>
              <Toggle
                enabled={systemUpdates}
                onChange={() => setSystemUpdates(!systemUpdates)}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
