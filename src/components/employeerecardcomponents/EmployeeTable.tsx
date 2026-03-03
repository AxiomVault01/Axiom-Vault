import Badge from "./Badge";
import { employees } from "../../pages/UiElements/Constants";
import { Link } from "react-router";
import { useState, useMemo } from "react";

const EmployeeTable = () => {
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Memoized filtered employees based on search and status filter
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase());
      // If "All Status" is selected, show all. Otherwise, match the employee's status with the selected filter.
      const matchesStatus =
        statusFilter === "All Status" ||
        emp.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden dark:bg-white/[0.03] dark:border-gray-700 dark:text-white">
      {/* Filters */}
      <div className="p-3 sm:p-4 border-b flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          placeholder="Search by name, employee ID, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-2 sm:gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm dark:text-gray-400"
          >
            <option>All Status</option>
            <option>Flagged</option>
            <option>Verified</option>
            <option>Pending</option>
          </select>

          <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-700 whitespace-nowrap">
            Export
          </button>
        </div>
      </div>

      {/* Table - Responsive */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs sm:text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs dark:bg-white/[0.03] dark:text-white">
            <tr>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">Employee</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left hidden md:table-cell">
                Department
              </th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left hidden lg:table-cell">
                Bank Account
              </th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left hidden sm:table-cell">
                Risk Type
              </th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">Severity</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">Status</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredEmployees.length === 0 && searchTerm ? (
                <tr className="w-full text-center">
                  <td className=" w-full text-center">
                    <p className="text-center py-10 px-5 text-gray-500 text-lg font-medium">
                      No employees found matching your criteria
                    </p>
                  </td>
                </tr>
             
            ) : (
              filteredEmployees.map((emp) => (
                <tr key={emp.id} className="">
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <p className="font-medium text-xs sm:text-sm">{emp.name}</p>
                    <p className="text-xs text-gray-500">{emp.id}</p>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">
                    <p className="text-xs sm:text-sm">{emp.department}</p>
                    <p className="text-xs text-gray-500">{emp.role}</p>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 hidden lg:table-cell">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs sm:text-sm">{emp.bank}</span>
                      {emp.info && <Badge text={emp.info} variant="red1" />}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
                    <Badge text={emp.risk} variant="red" />
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <Badge
                      text={emp.severity}
                      variant={
                        emp.severity === "Critical"
                          ? "red"
                          : emp.severity === "Medium"
                            ? "yellow"
                            : "orange"
                      }
                    />
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <Badge
                      text={emp.status}
                      icon={emp.icon}
                      variant={emp.status === "Verified" ? "green" : "red"}
                    />
                  </td>

                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-blue-600 font-medium cursor-pointer text-center">
                    <Link
                      to={`/employee/${emp.id}`}
                      className="text-xs sm:text-sm hover:underline dark:text-white"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
