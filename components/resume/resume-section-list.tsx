'use client';
import { extractCompanyAndUsername } from '@/lib/util';
import type {
  Certification,
  Education,
  ProfileLink,
  Project,
  Skill,
  WorkExperience,
} from '@prisma/client';

import { Pencil, Plus, Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export type sectionType =
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
  | ProfileLink;

interface ResumeSectionListProps {
  resumeId: string;
  sectionName: sectionType;
  sectionData: sectionData[];
}

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
      return (sectionData as Skill).header;
    case 'work':
      return (sectionData as WorkExperience).position;
    case 'links':
      return extractCompanyAndUsername((sectionData as ProfileLink).link);
    default:
      return 'N/A';
  }
};
const inputTypes: {
  [key in sectionType]: {
    [key in string]: string;
  };
} = {
  education: {
    // Define input types for education section
    school: 'text',
    degree: 'text',
    graduation: 'date',
  },
  links: {
    link: 'text',
  },
  work: {
    // Define input types for work section
    company: 'text',
    position: 'text',
    startDate: 'date',
    endDate: 'date',
    responsibilities: 'textarea',
  },
  projects: {
    // Define input types for project section
    name: 'text',
    description: 'textarea',
    startDate: 'date',
    endDate: 'date',
  },
  certificates: {
    // Define input types for certificate section
    name: 'text',
    issuingAuthority: 'text',
    date: 'date',
  },
  skills: {
    // Define input types for skills section
    header: 'text',
    skills: 'textarea',
  },
};

export default function ResumeSectionList({
  resumeId,
  sectionName,
  sectionData,
}: ResumeSectionListProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [currentSectionData, setCurrentSectionData] = useState<sectionData>();
  const [formSectionData, setFormSectionData] = useState<sectionData>();
  const [isEdit, setIsEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    switch (sectionName) {
      case 'education':
        setCurrentSectionData({
          school: '',
          graduation: '',
          degree: '',
        } as Education);
        setFormSectionData({
          school: '',
          graduation: '',
          degree: '',
        } as Education);
        break;
      case 'certificates':
        setCurrentSectionData({
          date: '',
          issuingAuthority: '',
          name: '',
        } as Certification);
        setFormSectionData({
          date: '',
          issuingAuthority: '',
          name: '',
        } as Certification);
        break;
      case 'links':
        setCurrentSectionData({
          link: '',
        } as ProfileLink);
        setFormSectionData({
          link: '',
        } as ProfileLink);
        break;
      case 'projects':
        setCurrentSectionData({
          name: '',
          description: '',
          startDate: '',
          endDate: '',
        } as Project);
        setFormSectionData({
          name: '',
          description: '',
          startDate: '',
          endDate: '',
        } as Project);
        break;
      case 'skills':
        setCurrentSectionData({
          header: '',
          skills: '',
        } as Skill);
        setFormSectionData({
          header: '',
          skills: '',
        } as Skill);
        break;
      case 'work':
        setCurrentSectionData({
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          responsibilities: '',
        } as WorkExperience);
        setFormSectionData({
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          responsibilities: '',
        } as WorkExperience);
        break;
    }
  }, []);

  const renderInputs = () => {
    const handleValue = (
      sectionName: sectionType,
      inputItem: string
    ): string => {
      try {
        switch (sectionName) {
          case 'education':
            return isEdit
              ? ((currentSectionData as Education)[
                  inputItem as keyof Education
                ] as string)
              : ((formSectionData as Education)[
                  inputItem as keyof Education
                ] as string);

          case 'work':
            return isEdit
              ? ((currentSectionData as WorkExperience)[
                  inputItem as keyof WorkExperience
                ] as string)
              : ((formSectionData as WorkExperience)[
                  inputItem as keyof WorkExperience
                ] as string);

          case 'projects':
            return isEdit
              ? ((currentSectionData as Project)[
                  inputItem as keyof Project
                ] as string)
              : ((formSectionData as Project)[
                  inputItem as keyof Project
                ] as string);

          case 'certificates':
            return isEdit
              ? ((currentSectionData as Certification)[
                  inputItem as keyof Certification
                ] as string)
              : ((formSectionData as Certification)[
                  inputItem as keyof Certification
                ] as string);

          case 'skills':
            return isEdit
              ? ((currentSectionData as Skill)[
                  inputItem as keyof Skill
                ] as string)
              : ((formSectionData as Skill)[
                  inputItem as keyof Skill
                ] as string);

          case 'links':
            return isEdit
              ? ((currentSectionData as ProfileLink)[
                  inputItem as keyof ProfileLink
                ] as string)
              : ((formSectionData as ProfileLink)[
                  inputItem as keyof ProfileLink
                ] as string);
        }
      } catch (e) {
        console.log(e);
        return '';
      }
    };

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      inputItem: string
    ) => {
      if (isEdit) {
        const clonedSectionData: any = { ...currentSectionData };
        clonedSectionData[inputItem] = e.currentTarget.value;
        setCurrentSectionData(clonedSectionData);
      } else {
        const clonedSectionData: any = { ...formSectionData };
        clonedSectionData[inputItem] = e.currentTarget.value;
        setFormSectionData(clonedSectionData);
      }
    };

    const handleFormSubmit = async (e: FormEvent, sectionName: sectionType) => {
      e.preventDefault();
      if (!isSaving) {
        setIsSaving(true);
        const response = await fetch('/api/resume/editDetail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sectionName: sectionName,
            resumeId: resumeId,
            isEdit: isEdit,
            data: isEdit ? { ...currentSectionData } : { ...formSectionData },
          }),
        });

        if (response.status === 200) {
          toast.success('Successfuly Saved!');
          setIsSaving(false);
          setIsEdit(false);
          setShowForm(false);
          router.refresh();
        } else {
          toast.error('Something went wrong! Try again later');
          setIsSaving(false);
        }
      }
    };
    return (
      <form
        onSubmit={(e) => handleFormSubmit(e, sectionName)}
        className="w-full flex flex-col gap-y-2 p-2"
      >
        {Object.keys(inputTypes[sectionName]).map((inputItem: string) => {
          if (
            inputTypes[sectionName][inputItem] == 'text' ||
            inputTypes[sectionName][inputItem] == 'date'
          ) {
            return (
              <div key={inputItem + sectionName}>
                <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2">
                  {inputItem}
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type={inputTypes[sectionName][inputItem]}
                  name={inputItem}
                  value={handleValue(sectionName, inputItem)}
                  placeholder={inputItem}
                  onChange={(e) => handleInputChange(e, inputItem)}
                  required
                />
              </div>
            );
          } else {
            return (
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name={inputItem}
                value={handleValue(sectionName, inputItem)}
                rows={3}
                placeholder={inputItem}
                onChange={(e) => handleInputChange(e, inputItem)}
                required
              />
            );
          }
        })}
        <button
          type="submit"
          disabled={isSaving}
          className={`${
            isSaving
              ? 'bg-gray-500 text-gray-400'
              : 'bg-[#279AF1] text-white hover:text-black hover:bg-[#f7f7ff]'
          } flex gap-x-1 items-center justify-center p-2 text-md transition-all duration-300 ease-in-out `}
        >
          <Save />
          Save
        </button>
      </form>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-y-2 items-end px-2">
        <div className="w-full flex flex-col border-slate-500 border rounded">
          {sectionData.map((data) => {
            return (
              <div className="w-full flex justify-between p-2 border-b border-slate-500">
                <p className="text-md w-[50%] font-semibold whitespace-normal">
                  {getTitleFromType(sectionName, data)}
                </p>
                <div className="flex gap-x-1">
                  <button
                    disabled={showForm}
                    onClick={() => {
                      setCurrentSectionData(data);
                      setIsEdit(true);
                      setShowForm(true);
                    }}
                    className="w-8 h-8 rounded p-1 hover:bg-[#F7F7FF] hover:text-[#279AF1] transition-all duration-300 ease-in-out"
                  >
                    <Pencil />
                  </button>
                  <button
                    disabled={showForm}
                    className="w-8 h-8 rounded p-1 hover:bg-[#F7F7FF] hover:text-red-500 transition-all duration-300 ease-in-out"
                  >
                    <X />
                  </button>
                </div>
              </div>
            );
          })}
          {sectionData.length === 0 && (
            <div className="w-full p-2">Nothing to see here...</div>
          )}
        </div>
        <button
          disabled={showForm}
          onClick={() => {
            setIsEdit(false);
            setShowForm(true);
          }}
          className="flex gap-x-1 items-center justify-between p-2 text-md bg-[#279AF1] text-white hover:text-black hover:bg-[#f7f7ff] transition-all duration-300 ease-in-out "
        >
          <Plus />
          Add new {sectionName}
        </button>
      </div>

      <div
        className={`${
          showForm ? 'flex' : 'hidden'
        } absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-[60%] lg:w-[40%] p-4 flex-col gap-y-4 bg-[#60656f] shadow rounded`}
      >
        <div className="w-full flex justify-between">
          <h2 className="text-md font-semibold">
            {isEdit ? 'Editing ' : 'Create New '}
            {sectionName}
          </h2>
          <button
            onClick={() => setShowForm(false)}
            className="hover:text-red-500 ease-in-out transition-all duration-200"
          >
            <X />
          </button>
        </div>
        {showForm && renderInputs()}
      </div>
    </>
  );
}
