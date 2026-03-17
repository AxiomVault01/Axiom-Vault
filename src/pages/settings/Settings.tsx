import { useState } from "react";
import Card from "../../components/settings/Card";
import Input from "../../components/settings/Input";
import Select from "../../components/settings/Select";
import Toggle from "../../components/settings/Toggle";
import { User, Bell, ChevronRight, Download, Trash2 } from "lucide-react";

function Settings() {
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [highRiskAlerts, setHighRiskAlerts] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);
  const [systemUpdates, setSystemUpdates] = useState(true);

  // system preferences
  const [language, setLanguage] = useState("English (US)");
  const [timeZone, setTimeZone] = useState("Eastern Time (ET)");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");

  return (
    <div className="min-h-screen  ">
      <div className="w-full mx-auto space-y-6">
        {/* Page Header */}
        <Card className="dark:bg-white/[0.03] dark:border-gray-700">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account and application preferences
          </p>
        </Card>

        {/* Account Settings */}
        <Card className="dark:bg-white/[0.03] dark:border-gray-700">
          <div className="flex items-start gap-3 mb-6">
            <div className="bg-[#2D91D1]/10 p-2 rounded-lg">
              <User className="w-5 h-5 text-[#2D91D1]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
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

            <Select
              label="Role"
              defaultValue="Select Role"
              className="dark:text-white"
            >
              <option disabled>Select Role</option>
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
        <Card className="dark:bg-white/[0.03] dark:border-gray-700">
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

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {/* Critical Risk */}
            <div className="flex items-center justify-between py-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Critical Risk Alerts
                </h3>
                <p className="text-sm text-gray-500 ">
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
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
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
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
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
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
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

        {/* Security & Privacy */}
        <Card className="dark:bg-white/[0.03] dark:border-gray-700">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Security & Privacy
            </h2>
            <p className="text-sm text-gray-500">
              Manage your security settings
            </p>
            <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
              {[
                "Change Password",
                "Two-Factor Authentication",
                "Session Management",
              ].map((item) => (
                <button
                  key={item}
                  className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    {item}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* System Preferences */}
        <Card className="dark:bg-white/[0.03] dark:border-gray-700">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              System Preferences
            </h2>
            <p className="text-sm text-gray-500">
              Customize your application experience
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish</option>
              </Select>
              <Select
                label="Time Zone"
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
              >
                <option>Eastern Time (ET)</option>
                <option>Central Time (CT)</option>
                <option>Pacific Time (PT)</option>
              </Select>
              <Select
                label="Date Format"
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
              >
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </Select>
            </div>
            <button className="mt-4 bg-[#2D91D1] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#2D91D1]/90 transition-all duration-300">
              Save Preferences
            </button>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="dark:bg-white/[0.03] dark:border-gray-700">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Data Management
            </h2>
            <p className="text-sm text-gray-500">Export and manage your data</p>
            <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
              <button className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    Export Account Data
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-red-500">Delete Account</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Settings;
