import InvestigationHeader from "../../components/investigations/InvestigationHeader";
import InvestigationStats from "../../components/investigations/InvestigationStats";
import RelatedEntities from "../../components/investigations/RelatedEntities";
import InvestigationTimeline from "../../components/investigations/InvestigationTimeline";
import CaseStatusCard from "../../components/investigations/CaseStatusCard";
import AssignedInvestigator from "../../components/investigations/AssignedInvestigator";
import QuickActions from "../../components/investigations/QuickActions";
import EvidenceDocuments from "../../components/investigations/EvidenceDocuments";
import ActivityLog from "../../components/investigations/ActivityLog";
import TransactionAnalysis from "../../components/investigations/TransactionAnalysis";
import AiSummary from "../../components/investigations/AiSummary";
import NotesComments from "../../components/investigations/NotesComments";
import { UserRound, AlertCircle, SendToBack } from "lucide-react";
import ConnectedTransactions from "../../components/investigations/ConnectedTransactions";
import LinkedAlerts from "../../components/investigations/LinkedAlerts";

export default function InvestigationDetails(){

    return(
        <div className="space-y-6">
            <InvestigationHeader/>
            <InvestigationStats/>

            <div className="flex gap-2 items-center">
               <UserRound size={20}/>
                <h2 className="font-medium">Related Entities</h2>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* left */}
                <div className="col-span-12 xl:col-span-3 space-y-6">
                    <RelatedEntities/>

                    <div className="flex gap-2 items-center">
                        <AlertCircle size={20}/>
                        <h2 className="font-medium">Linked Alerts</h2>
                   </div>

                    <LinkedAlerts/>

                    <div className="flex gap-2 items-center">
                        <SendToBack size={20}/>
                        <h2 className="font-medium">Connected Transactions</h2>
                   </div>

                    <ConnectedTransactions/>
               </div>
                {/* center */}
               <div className="col-span-12 xl:col-span-6 space-y-6">
                    <InvestigationTimeline/>
                    <EvidenceDocuments/>
                    <TransactionAnalysis/>
                    <AiSummary/>
                    <NotesComments/>
              </div>
             {/* right */}
              <div className="col-span-12 xl:col-span-3 space-y-6">
                    <CaseStatusCard/>
                    <AssignedInvestigator/>
                    <QuickActions/>
                    <ActivityLog/>
               </div>
            </div>
       </div>
    )
}