import { BrowserRouter as Router, Routes, Route } from "react-router";
import Welcome from "./pages/AuthPages/Welcome";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import EmailRequired from "./pages/AuthPages/EmailRequired";
import EmailVerification from "./pages/AuthPages/EmailVerification";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import VerifyCode from "./pages/AuthPages/VerifyCode";
import ResetPassword from "./pages/AuthPages/ResetPassword";
import ResetPasswordSuccessful from "./pages/AuthPages/ResetPasswordSuccessful";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
// import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Analytics from "./components/analytics/Analytics";
import Settings from "./pages/settings/Settings";
import EmployeeRecords from "./pages/employeeinfo/EmployeeRecords";
import Profile from "./pages/newprofile/Profile";
import EmployeeDetails from "./pages/employeeinfo/EmployeeDetails";
import ReportsPage from "./components/reports/Reportspage";
import InvestigationsPage from "./pages/investigations/InvestigationsPage";
import InvestigationDetails from "./pages/investigations/InvestigationDetails";
import EscalateCasePage from "./pages/investigations/EscalateCasePage";
import AlertDetailPage from "./pages/Alerts/AlertDetailPage";
import AlertsPage from "./pages/Alerts/AlertsPage";
// import WelcomePage from "./components/auth/WelcomePage";
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./components/Protectedroute/ProtectedRoute";

export default function App() {
  return (
    <>
      <Router>
        <Toaster  />
        <ScrollToTop />
        <Routes>
          <Route index path="/" element={<Welcome />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/email-required" element={<EmailRequired />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/reset-password-successful"
            element={<ResetPasswordSuccessful />}
          />

          {/* Protected Dashboard Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/investigations" element={<InvestigationsPage />} />
              <Route path="/employee-records" element={<EmployeeRecords />} />
              <Route path="/employee/:id" element={<EmployeeDetails />} />
              <Route path="/investigations/:id" element={<InvestigationDetails />} />
              <Route path="/investigations/escalate" element={<EscalateCasePage />} />
              {/* Others Page */}
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/blank" element={<Blank />} />
              {/* Forms */}
              <Route path="/form-elements" element={<FormElements />} />
              {/* Tables */}
              <Route path="/basic-tables" element={<BasicTables />} />
              {/* Alerts */}
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/alerts/:id" element={<AlertDetailPage />} />
              {/* Ui Elements */}
              {/* <Route path="/alerts" element={<Alerts />} /> */}
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} />
              {/* Charts */}
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />
            </Route>
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
