'use client';
import { extractCompanyAndUsername } from '@/lib/util';
import type {
  Certification,
  Education,
  Project,
  Skill,
  WorkExperience,
} from '@prisma/client';
import { Pencil, Plus, X } from 'lucide-react';

type sectionType =
  | 'education'
  | 'work'
  | 'projects'
  | 'certificates'
  | 'skills'
  | 'links';
type sectionData =
  | Education
  | WorkExperience
  | Project
  | Certification
  | Skill
  | string;
interface ResumeSectionListProps {
  sectionName: sectionType;
  sectionData: sectionData[];
}

const ResumeSectionListItem = ({ title }: { title: string }) => {
  return (
    <div className="w-full flex justify-between p-2 border-b border-slate-500">
      <p className="text-md w-[50%] font-semibold whitespace-normal">{title}</p>
      <div className="flex gap-x-1">
        <button className="w-8 h-8 rounded p-1 hover:bg-[#F7F7FF] hover:text-[#279AF1] transition-all duration-300 ease-in-out">
          <Pencil />
        </button>
        <button className="w-8 h-8 rounded p-1 hover:bg-[#F7F7FF] hover:text-red-500 transition-all duration-300 ease-in-out">
          <X />
        </button>
      </div>
    </div>
  );
};

const getTitleFromType = (
  sectionName: sectionType,
  sectionData: sectionData
) => {
  switch (sectionName) {
    case 'education':
      return (sectionData as Education).school;
    case 'certificates':
      return (sectionData as Certification).name;
    case 'projects':
      return (sectionData as Project).name;
    case 'skills':
      return (sectionData as Skill).name;
    case 'work':
      return (sectionData as WorkExperience).position;
    case 'links':
      return extractCompanyAndUsername(sectionData as string);
    default:
      return 'N/A';
  }
};

export default function ResumeSectionList({
  sectionName,
  sectionData,
}: ResumeSectionListProps) {
  return (
    <>
      <div className="flex flex-col gap-y-2 items-end px-2">
        <div className="w-full flex flex-col border-slate-500 border rounded">
          {sectionData.map((data) => {
            return (
              <ResumeSectionListItem
                title={getTitleFromType(sectionName, data)}
              />
            );
          })}
          {sectionData.length === 0 && (
            <div className="w-full p-2">Nothing to see here...</div>
          )}
        </div>
        <button className="flex gap-x-1 items-center justify-between p-2 text-md bg-[#279AF1] text-white hover:text-black hover:bg-[#f7f7ff] transition-all duration-300 ease-in-out ">
          <Plus />
          Add new {sectionName}
        </button>
      </div>
    </>
  );
}
