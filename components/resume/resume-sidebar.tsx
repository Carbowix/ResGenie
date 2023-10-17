'use client';
import {
  ArrowLeft,
  Briefcase,
  Contact,
  FileBadge,
  GraduationCap,
  Presentation,
  UserCog,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

function SideBarIcon({
  tooltip,
  iconName,
  onClickHandler = () => {},
}: {
  tooltip: string;
  iconName: React.ReactNode;
  onClickHandler?: VoidFunction;
}) {
  return (
    <div className="relative group">
      <div className="absolute top-1/2 transform translate-x-16 -translate-y-1/2 whitespace-nowrap p-2 font-medium text-black bg-[#F7F7FF] rounded-lg shadow-sm hidden group-hover:block transition-all duration-300 ease-in-out">
        {tooltip}
      </div>
      <div
        onClick={onClickHandler}
        className="w-12 h-12 rounded p-2 hover:bg-[#F7F7FF] hover:text-[#279AF1] transition-all duration-300 ease-in-out flex items-center justify-center relative"
      >
        {iconName}
      </div>
    </div>
  );
}

export default function ResumeSiderbar() {
  const router = useRouter();
  return (
    <div className="w-16 h-full bg-[#60656f] border-l border-gray-500 flex flex-col space-y-2 items-center p-1">
      <SideBarIcon
        key={'back_button'}
        tooltip={'Back'}
        iconName={<ArrowLeft />}
        onClickHandler={() => router.push('/dashboard')}
      />
      <hr className="style-six w-full" />
      <SideBarIcon
        key={'personal_button'}
        tooltip="Personal Information"
        iconName={<Contact />}
      />
      <SideBarIcon
        key={'education_button'}
        tooltip="Education"
        iconName={<GraduationCap />}
      />
      <SideBarIcon
        key={'work_button'}
        tooltip="Work Experience"
        iconName={<Briefcase />}
      />
      <SideBarIcon
        key={'projects_button'}
        tooltip="Projects"
        iconName={<Presentation />}
      />
      <SideBarIcon
        key={'certifications_button'}
        tooltip="Certifications"
        iconName={<FileBadge />}
      />
      <SideBarIcon
        key={'skills_button'}
        tooltip="Skills"
        iconName={<UserCog />}
      />
    </div>
  );
}
