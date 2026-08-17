import QucikActions from "@/components/employeeDashboard/quickActions/qucikActions";
import DashboardWidgets from "@/components/employeeDashboard/dashboardWidgets/dashboardWidgets";

export default async function EmployeeDashbord() {
  return (
    <div className="dashboard">
      <QucikActions />
      <DashboardWidgets />
    </div>
  );
}
