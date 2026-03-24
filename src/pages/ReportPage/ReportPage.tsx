import PageMeta from "../../components/common/PageMeta";
import RecentReports from "../../components/report/RecentReports";
import ReportBuilder from "../../components/report/ReportBuilder";
import ReportMetrics from "../../components/report/ReportMetrics";
import Reports from "../../components/report/Reports";
import ReportTemplates from "../../components/report/ReportTemplates";



export default function ReportPage() {
  return (
    <>
      <PageMeta
         title="Axiom Vault | Reports"
         description="Axiom Vault is an AI enabled fraud detection and prevention platform that helps businesses identify and mitigate fraudulent activities in real-time, ensuring the security of their operations and customers."
       />

        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-12 xl:col-span-12">
                <Reports />
            </div>

            <div className="col-span-12 space-y-12 xl:col-span-12">
                <ReportMetrics />
           </div>

           <div className="col-span-12">
              <ReportTemplates />
           </div>

           <div className="col-span-12">
              <ReportBuilder />
           </div>

           <div className="col-span-12">
              <RecentReports />
           </div>
        </div>
    </>
 );
}