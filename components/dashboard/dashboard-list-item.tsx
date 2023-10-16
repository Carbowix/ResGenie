'use client';
import { FilePlus, PencilIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
interface DashboardListItemProps {
  title?: string;
  resumeId?: string;
  lastUpdated?: string;
  isResume: boolean;
}
export default function DashboardListItem({
  title = 'Create a New Resume',
  resumeId = '/resume/new',
  isResume,
  lastUpdated,
}: DashboardListItemProps) {
  return (
    <div className="flex flex-col gap-y-1">
      <Link href={resumeId}>
        <div className="w-64 h-96 rounded-sm border border-slate-300 hover:border-[#488DB7] relative group transition-all duration-300 ease-in-out">
          {isResume && (
            <Image
              src="/res_placeholder.png"
              width={128}
              height={128}
              alt="resume picture"
              className="w-full h-full z-10 group-hover:opacity-50 transition-opacity duration-300 ease-in-out"
            />
          )}

          <div
            className={`${
              isResume
                ? 'hidden group-hover:block text-[#488DB7]'
                : 'group-hover:text-[#488DB7]'
            } z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 transition-all duration-300 ease-in-out`}
          >
            {isResume ? <PencilIcon /> : <FilePlus />}
          </div>
        </div>
      </Link>

      <h4 className="text-lg">{title}</h4>
      {lastUpdated && (
        <h5 className="text-sm text-gray-500">Last updated {lastUpdated}</h5>
      )}
    </div>
  );
}
