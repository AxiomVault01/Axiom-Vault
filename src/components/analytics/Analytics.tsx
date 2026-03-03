import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import PageMeta from "../../components/common/PageMeta";
import RiskTrendsChart from "./RiskTrendsChart";
import RiskCategoriesChart from "./Riskcategorieschart";
import AlertTypeDistributionChart from "./Alerttypedistributionchart";
import RiskCasesByDepartmentChart from "./Riskcasesbydepartmentchart";
import ResolutionTimeframeChart from "./Resolutiontimeframechart";
import PerformanceTrendChart from "./Performancetrendchart";
import InsightsPanel from "./Insightspanel";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
);

export default function Analytics() {
  return (
    <>
      <PageMeta
        title="Axiom Vault | Dashboard"
        description="Axiom Vault is an AI enabled fraud detection and prevention platform that helps businesses identify and mitigate fraudulent activities in real-time, ensuring the security of their operations and customers."
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6 mt-4">

        <div className="col-span-12 space-y-12 xl:col-span-12">
          <EcommerceMetrics />
        </div>

        <div className="col-span-12 space-y-12 xl:col-span-6">
          <RiskTrendsChart className="lg:col-span-3" />
        </div>

        <div className="col-span-12 space-y-12 xl:col-span-6">
          <RiskCategoriesChart className="lg:col-span-3" />
        </div>

        <div className="col-span-12 space-y-12 xl:col-span-6">
          <AlertTypeDistributionChart className="lg:col-span-3" />
        </div>

        <div className="col-span-12 space-y-12 xl:col-span-6">
          <RiskCasesByDepartmentChart className="lg:col-span-3" />
        </div>

        <div className="col-span-12 space-y-12 xl:col-span-6">
          <ResolutionTimeframeChart className="lg:col-span-3" />
        </div>

        <div className="col-span-12 space-y-12 xl:col-span-6">
          <PerformanceTrendChart className="lg:col-span-3" />
        </div>

        <div className="col-span-12 space-y-12 mb-4 xl:col-span-12">
          <InsightsPanel />
        </div>

      </div>

    </>
  );
}
