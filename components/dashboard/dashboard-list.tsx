import DashboardListItem from './dashboard-list-item';

export default function DashboardList() {
  return (
    <div className="flex gap-x-2 w-full h-full">
      <DashboardListItem isResume />
    </div>
  );
}
