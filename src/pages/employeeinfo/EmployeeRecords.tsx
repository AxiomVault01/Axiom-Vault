import SummaryCard from "../../components/employeerecardcomponents/SummaryCard";
import EmployeeTable from "../../components/employeerecardcomponents/EmployeeTable";
import { Users, AlertTriangle, CheckCircle, Filter } from "lucide-react";

const EmployeeRecords = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex dark:bg-black">
      

      <main className="flex-1 flex flex-col">
        

        <div className="p-4 md:p-8 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard
              icon={<Users size={18} />}
              value="8"
              label="Total Employees"
              bg="bg-blue-100 text-blue-600"
            />
            <SummaryCard
              icon={<AlertTriangle size={18} />}
              value="5"
              label="Flagged Records"
              bg="bg-red-100 text-red-600"
            />
            <SummaryCard
              icon={<CheckCircle size={18} />}
              value="3"
              label="Verified Clean"
              bg="bg-green-100 text-green-600"
            />
            <SummaryCard
              icon={<Filter size={18} />}
              value="0"
              label="Under Review"
              bg="bg-gray-100 text-gray-600"
            />
          </div>

          {/* Table */}
          <EmployeeTable />
        </div>
      </main>
    </div>
  );
};

export default EmployeeRecords;
