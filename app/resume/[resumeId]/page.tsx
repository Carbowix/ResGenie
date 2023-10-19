import { getAuthSession } from '@/app/api/auth/[...nextauth]/route';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ResumeSiderbar from '@/components/resume/resume-sidebar';
import ResumeForm from '@/components/resume/resume-form';
import ResumeViewer from '@/components/resume/resume-viewer';

export default async function ResumePage({
  params,
}: {
  params: { resumeId: string };
}) {
  const userSession = await getAuthSession();
  if (!userSession) return notFound();
  const resumeData = await prisma.resume.findUnique({
    where: { id: params.resumeId },
    include: {
      education: true,
      skills: true,
      projects: true,
      workExperience: true,
      certifications: true,
      profileLinks: true,
      user: true,
    },
  });

  if (!resumeData) return notFound();
  if (!resumeData.isPublic && resumeData.userId !== userSession.user.id)
    return notFound();
  return (
    <div className="w-screen h-screen bg-[#131112] text-white flex flex-col md:flex-row">
      {resumeData.userId == userSession.user.id && (
        <div className="w-full h-full md:w-[50%] flex">
          <ResumeSiderbar />
          <ResumeForm resumeData={resumeData} />
        </div>
      )}

      <ResumeViewer
        username={resumeData.user.username}
        resumeData={resumeData}
      />
    </div>
  );
}
