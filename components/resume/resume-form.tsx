'use client';
import type {
  Certification,
  Education,
  Project,
  Resume,
  Skill,
  WorkExperience,
} from '@prisma/client';
import ResumeChangeTitle from './resume-change-title';
import { useState } from 'react';
import ResumeSectionList from './resume-section-list';
interface ResumeFormProps {
  resumeData: Resume & {
    education: Education[];
    workExperience: WorkExperience[];
    skills: Skill[];
    certifications: Certification[];
    projects: Project[];
  };
}
export default function ResumeForm({ resumeData }: ResumeFormProps) {
  const [form, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    objective: '',
    location: '',
    birthday: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full h-full p-2 flex flex-col space-y-2">
      <ResumeChangeTitle resumeId={resumeData.id} title={resumeData.title} />
      <hr className="style-six" />
      <form className="w-full space-y-2 overflow-y-scroll">
        <h2 className="text-2xl font-bold p-2">Personal Information</h2>
        <div className="w-full flex flex-wrap">
          <div className="w-full md:w-1/2 p-2">
            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2">
              Full Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 p-2">
            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2">
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="email"
              name="email"
              value={form.email}
              placeholder="johndoe@email.com"
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 p-2">
            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2">
              Phone Number
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber}
              placeholder={'e.g., (123) 456-7890'}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 p-2">
            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2">
              Objective
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              name="objective"
              value={form.objective}
              rows={3}
              placeholder={'Your objective...'}
              style={{ resize: 'none' }}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 p-2">
            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2">
              Location
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              name="location"
              placeholder={'Cairo, Egypt'}
              value={form.location}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 p-2">
            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2">
              Birthday
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="date"
              name="birthday"
              value={form.birthday}
              onChange={handleChange}
            />
          </div>
        </div>
        <hr className="style-six" />
        <h2 id="education_section" className="text-2xl font-bold p-2">
          Profile Links
        </h2>
        <ResumeSectionList sectionName="links" sectionData={resumeData.links} />
        <hr className="style-six" />
        <h2 id="education_section" className="text-2xl font-bold p-2">
          Education
        </h2>
        <ResumeSectionList
          sectionName="education"
          sectionData={resumeData.education}
        />
        {/*
<div className="w-full flex flex-col border-slate-500 border rounded">
          <div className="w-full flex justify-between p-2 border-b border-slate-500">
            <p className="text-md w-[50%] font-semibold whitespace-normal">
              Some name
            </p>
            <div className="flex gap-x-1">
              <button className="w-8 h-8 rounded p-1 hover:bg-[#F7F7FF] hover:text-[#279AF1] transition-all duration-300 ease-in-out">
                <Pencil />
              </button>
              <button className="w-8 h-8 rounded p-1 hover:bg-[#F7F7FF] hover:text-red-500 transition-all duration-300 ease-in-out">
                <X />
              </button>
            </div>
          </div>
          <div className="w-full flex justify-between p-2 border-b border-slate-500">
            <p className="text-md font-semibold">Some name</p>
            <div className="flex gap-x-1">
              <button className="w-8 h-8 rounded p-1 hover:bg-[#F7F7FF] hover:text-[#279AF1] transition-all duration-300 ease-in-out">
                <Pencil />
              </button>
              <button className="w-8 h-8 rounded p-1 hover:bg-[#F7F7FF] hover:text-red-500 transition-all duration-300 ease-in-out">
                <X />
              </button>
            </div>
          </div>
        </div>
          */}

        <h2 id="work_section" className="text-2xl font-bold p-2">
          Work Experience
        </h2>
        <ResumeSectionList
          sectionName="work"
          sectionData={resumeData.workExperience}
        />
        <hr className="style-six" />

        <h2 id="projects_section" className="text-2xl font-bold p-2">
          Projects
        </h2>
        <ResumeSectionList
          sectionName="projects"
          sectionData={resumeData.projects}
        />
        <hr className="style-six" />

        <h2 id="certifications_section" className="text-2xl font-bold p-2">
          Certifications
        </h2>
        <ResumeSectionList
          sectionName="certificates"
          sectionData={resumeData.certifications}
        />
        <hr className="style-six" />

        <h2 id="skills_section" className="text-2xl font-bold p-2">
          Skills
        </h2>
        <ResumeSectionList
          sectionName="skills"
          sectionData={resumeData.skills}
        />
      </form>
    </div>
  );
}
