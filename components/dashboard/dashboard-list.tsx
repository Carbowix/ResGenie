'use client';
import { formatMessageDate } from '@/lib/util';
import DashboardListItem from './dashboard-list-item';
interface DashboardListProps {
  initResumes: {
    id: string;
    title: string;
    updatedAt: Date;
  }[];
}
export default function DashboardList({ initResumes }: DashboardListProps) {
  return (
    <div className="flex flex-col items-center gap-y-2 lg:items-start lg:flex-row lg:gap-x-2 lg:flex-wrap w-full h-full overflow-hidden overflow-y-scroll">
      <DashboardListItem isResume={false} />
      {initResumes?.map((resume) => {
        return (
          <DashboardListItem
            key={resume.id}
            resumeId={resume.id}
            title={resume.title}
            lastUpdated={formatMessageDate(resume.updatedAt)}
            isResume
          />
        );
      })}
    </div>
  );
}
