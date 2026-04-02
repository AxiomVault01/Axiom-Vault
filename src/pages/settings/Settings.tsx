import { useState } from "react";
import Card from "../../components/settings/Card";
import Input from "../../components/settings/Input";
import Select from "../../components/settings/Select";
import Toggle from "../../components/settings/Toggle";
import { User, Bell, Download, Trash2, Lock, Database } from "lucide-react";

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
            <div className="bg-brand-500/10 p-2 rounded-lg">
              <User className="w-5 h-5 text-brand-500" />
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

          <button className="mt-6 bg-brand-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300">
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
          <div className="">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-lg text-red-600">
                <Lock />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Security & Privacy
                </h2>
                <p className="text-sm text-gray-500">
                  Manage your security settings
                </p>
              </div>
            </div>
            <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
              {/* CHANGE PASSWORD */}
             <div  className="w-full py-4 text-left hover:bg-gray-100 dark:hover:bg-gray-800 border px-3 rounded-lg mt-4 cursor-pointer">
              <h1 className="font-medium text-md">Change Password</h1>
              <p className="text-xs font-normal text-gray-500">Update your account password</p>
             </div>
             {/* TWO-FACTOR AUTHENTICATION */}
             <div  className="w-full py-4 text-left hover:bg-gray-100 dark:hover:bg-gray-800 border px-3 rounded-lg mt-4 cursor-pointer">
              <h1 className="font-medium text-md">Two-Factor Authentication</h1>
              <p className="text-xs font-normal text-gray-500">Add an extra layer of security</p>
             </div>
             {/* SESSION MANAGEMENT */}
             <div  className="w-full py-4 text-left hover:bg-gray-100 dark:hover:bg-gray-800 border px-3 rounded-lg mt-4 cursor-pointer">
              <h1 className="font-medium text-md">Session Management</h1>
              <p className="text-xs font-normal text-gray-500">View and manage active sessions</p>
             </div>
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
            <button className="mt-4 bg-brand-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium  transition-all duration-300">
              Save Preferences
            </button>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="dark:bg-white/[0.03] dark:border-gray-700">
          <div className="space-y-2">
            <div className="flex gap-3 items-center mb-5">
              <p className="bg-green-100 p-3 rounded-lg text-green-700"><Database/></p>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 ">
                  Data Management
                </h2>
                 <p className="text-sm text-gray-500">Export and manage your data</p>
              </div>
            </div>
           
            <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700 gap-3">
              <button className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg border border-gray-300 px-3">
                <div className="flex items-center gap-3 ">
                  <Download className="w-5 h-5 text-green-700" />
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Export Account Data
                    </h2>
                    <p className="text-xs text-gray-400">Download all your data in a CSV format</p>
                  </div>
                </div>
                
              </button>
              <button className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg border border-red-600 px-3 text-red-600 ">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 " />
                  <div>
                    <h2 className="text-sm font-semibold ">Delete Account</h2>
                    <p className="text-xs">Permanently delete your account and data</p>
                  </div>
                </div>
               
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Settings;
