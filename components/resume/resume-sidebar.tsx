'use client';
import {
  ArrowLeft,
  Briefcase,
  Contact,
  FileBadge,
  GraduationCap,
  Link,
  Presentation,
  UserCog,
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

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
  const currentPath = usePathname();
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
        onClickHandler={() => router.push(currentPath + '#personal_section')}
      />
      <SideBarIcon
        key={'profile_button'}
        tooltip="Profile Links"
        iconName={<Link />}
        onClickHandler={() =>
          router.push(currentPath + '#profile_links_section')
        }
      />
      <SideBarIcon
        key={'education_button'}
        tooltip="Education"
        iconName={<GraduationCap />}
        onClickHandler={() => router.push(currentPath + '#education_section')}
      />
      <SideBarIcon
        key={'work_button'}
        tooltip="Work Experience"
        iconName={<Briefcase />}
        onClickHandler={() => router.push(currentPath + '#work_section')}
      />
      <SideBarIcon
        key={'projects_button'}
        tooltip="Projects"
        iconName={<Presentation />}
        onClickHandler={() => router.push(currentPath + '#projects_section')}
      />
      <SideBarIcon
        key={'certifications_button'}
        tooltip="Certifications"
        iconName={<FileBadge />}
        onClickHandler={() =>
          router.push(currentPath + '#certifications_section')
        }
      />
      <SideBarIcon
        key={'skills_button'}
        tooltip="Skills"
        iconName={<UserCog />}
        onClickHandler={() => router.push(currentPath + '#skills_section')}
      />
    </div>
  );
}
