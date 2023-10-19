'use client';
import { FilePlus, PencilIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
interface DashboardListItemProps {
  title?: string;
  resumeId?: string;
  lastUpdated?: string;
  isResume: boolean;
}
export default function DashboardListItem({
  title = 'Create a New Resume',
  resumeId = 'new',
  isResume,
  lastUpdated,
}: DashboardListItemProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async (resumeId: string) => {
    if (!isDeleting) {
      setIsDeleting(true);
      const response = await fetch('/api/resume/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeId: resumeId,
        }),
      });

      if (response.status === 200) {
        toast.success('Successfuly deleted the resume');
        setIsDeleting(false);
        router.refresh();
      } else {
        setIsDeleting(false);
        toast.error('Error occured while deleting the resume');
      }
    }
  };
  return (
    <div className="flex flex-col gap-y-1">
      <div
        onClick={() => {
          if (!isDeleting) {
            router.push('/resume/' + resumeId);
          }
        }}
        className={`${
          isDeleting
            ? ' border-none'
            : 'border border-slate-300 hover:border-[#488DB7]'
        } w-64 h-96 rounded-sm relative group transition-all duration-300 ease-in-out cursor-pointer`}
      >
        {isResume && (
          <Image
            src="/res_placeholder.png"
            width={128}
            height={128}
            alt="resume picture"
            className={`${
              isDeleting ? 'opacity-50' : 'group-hover:opacity-50'
            } w-full h-full z-10 transition-opacity duration-300 ease-in-out`}
          />
        )}

        <div
          className={`${
            isResume
              ? `${isDeleting ? '' : 'hidden group-hover:block text-[#488DB7]'}`
              : 'group-hover:text-[#488DB7]'
          } z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 transition-all duration-300 ease-in-out`}
        >
          {isResume ? <PencilIcon /> : <FilePlus />}
        </div>
      </div>

      <div className="flex w-64 justify-between">
        <div className="flex flex-col gap-y-1">
          <h4 className="text-lg">{title}</h4>
          {lastUpdated && (
            <h5 className="text-sm text-gray-500">
              Last updated {lastUpdated}
            </h5>
          )}
        </div>
        <button
          disabled={isDeleting}
          onClick={() => handleDelete(resumeId)}
          className={`${isResume ? 'block' : 'hidden'} ${
            isDeleting ? '' : 'hover:bg-[#F7F7FF] hover:text-red-500'
          } w-8 h-8 rounded p-1  transition-all duration-300 ease-in-out`}
        >
          <X />
        </button>
      </div>
    </div>
  );
}
