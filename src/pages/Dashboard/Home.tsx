import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
// import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
// import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
// import RecentOrders from "../../components/ecommerce/RecentOrders";
// import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import RiskAlert from "../../components/ui/alert/risk-alert";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import ComponentCard from "../../components/common/ComponentCard";
import QuickActions from "../UiElements/QuickActions";
import RiskTrendsChart from "../../components/analytics/RiskTrendsChart";
import RiskCategoriesChart from "../../components/analytics/Riskcategorieschart";
import SuspiciousActivities from "../../components/employeerecardcomponents/SuspiciousActivities";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Axiom Vault | Dashboard"
        description="Axiom Vault is an AI enabled fraud detection and prevention platform that helps businesses identify and mitigate fraudulent activities in real-time, ensuring the security of their operations and customers."
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-12 xl:col-span-12">
          <RiskAlert />
          <EcommerceMetrics />

          {/* <MonthlySalesChart /> */}
        </div>

        <div className="col-span-12 space-y-12 xl:col-span-6">
          <RiskTrendsChart className="lg:col-span-3" />
        </div>

        <div className="col-span-12 space-y-12 xl:col-span-6">
          <RiskCategoriesChart className="lg:col-span-3" />
        </div>

        <div className="col-span-12 xl:col-span-9">
          <SuspiciousActivities />
        </div>

        <div className="col-span-12 xl:col-span-3">
          <QuickActions />
        </div>

        <div className="col-span-12 xl:col-span-12">
          <div className="space-y-6">
            <ComponentCard title="Flagged Employee Records" desc="Employees with suspicious activities detected by AI">
              <BasicTableOne />
            </ComponentCard>
          </div>
        </div>
      </div>
    </>
  );
}
