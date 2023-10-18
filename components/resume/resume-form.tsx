'use client';
import type {
  Certification,
  Education,
  ProfileLink,
  Project,
  Resume,
  Skill,
  WorkExperience,
} from '@prisma/client';
import ResumeChangeTitle from './resume-change-title';
import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import ResumeSectionList from './resume-section-list';
import toast from 'react-hot-toast';
interface ResumeFormProps {
  resumeData: Resume & {
    education: Education[];
    workExperience: WorkExperience[];
    skills: Skill[];
    certifications: Certification[];
    projects: Project[];
    profileLinks: ProfileLink[];
  };
  guestMode: boolean;
}
export default function ResumeForm({ resumeData, guestMode }: ResumeFormProps) {
  const [formData, setFormData] = useState({
    fullName: resumeData.fullName || '',
    email: resumeData.email || '',
    phoneNumber: resumeData.phoneNumber || '',
    objective: resumeData.objective || '',
    location: resumeData.location || '',
    birthday: resumeData.birthday || '',
    isPublic: resumeData.isPublic,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const saveInterval = setInterval(async () => {
      // Here, you can save 'dataToSave' to your backend or storage
      const response = await fetch('/api/resume/editPersonal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeId: resumeData.id,
          data: { ...formData },
        }),
      });

      if (response.status === 200) {
        toast.success('Autosave successful');
      } else {
        toast.error('Error occured while autosaving');
      }
    }, 120000); // Save data every 2 mins

    return () => {
      clearInterval(saveInterval);
    };
  }, [formData]);

  return (
    <div className="w-full h-full p-2 flex flex-col space-y-2">
      <div className="flex w-full justify-between items-center">
        <ResumeChangeTitle resumeId={resumeData.id} title={resumeData.title} />
        <div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              id="publicToggle"
              name="publicToggle"
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={formData.isPublic}
              onChange={(e) =>
                setFormData({ ...formData, isPublic: e.currentTarget.checked })
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium ">Public</span>
          </label>
        </div>
      </div>

      <hr className="style-six" />
      <div className="w-full space-y-2 overflow-y-scroll">
        <h2 id="personal_section" className="text-2xl font-bold p-2">
          Personal Information
        </h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-wrap">
          <div className="w-full md:w-1/2 p-2">
            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2">
              Full Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
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
              value={formData.email}
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
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
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
              value={formData.objective}
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
              value={formData.location}
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
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>
        </form>
        <hr className="style-six" />
        <h2 id="profile_links_section" className="text-2xl font-bold p-2">
          Profile Links
        </h2>
        <ResumeSectionList
          resumeId={resumeData.id}
          key={'profileLinks'}
          sectionName="links"
          sectionData={resumeData.profileLinks}
        />
        <hr className="style-six" />
        <h2 id="education_section" className="text-2xl font-bold p-2">
          Education
        </h2>
        <ResumeSectionList
          resumeId={resumeData.id}
          key={'education'}
          sectionName="education"
          sectionData={resumeData.education}
        />
        <h2 id="work_section" className="text-2xl font-bold p-2">
          Work Experience
        </h2>
        <ResumeSectionList
          resumeId={resumeData.id}
          key={'work'}
          sectionName="work"
          sectionData={resumeData.workExperience}
        />
        <hr className="style-six" />

        <h2 id="projects_section" className="text-2xl font-bold p-2">
          Projects
        </h2>
        <ResumeSectionList
          resumeId={resumeData.id}
          key={'projects'}
          sectionName="projects"
          sectionData={resumeData.projects}
        />
        <hr className="style-six" />

        <h2 id="certifications_section" className="text-2xl font-bold p-2">
          Certifications
        </h2>
        <ResumeSectionList
          resumeId={resumeData.id}
          key={'certificates'}
          sectionName="certificates"
          sectionData={resumeData.certifications}
        />
        <hr className="style-six" />

        <h2 id="skills_section" className="text-2xl font-bold p-2">
          Skills
        </h2>
        <ResumeSectionList
          key={'skills'}
          resumeId={resumeData.id}
          sectionName="skills"
          sectionData={resumeData.skills}
        />
      </div>
    </div>
  );
}
