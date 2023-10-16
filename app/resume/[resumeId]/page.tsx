import { getAuthSession } from '@/app/api/auth/[...nextauth]/route';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';

export default async function ResumePage({
  params,
}: {
  params: { resumeId: string };
}) {
  const userSession = await getAuthSession();
  if (!userSession) return notFound();
  console.log(params.resumeId);
  const resumeData = await prisma.resume.findUnique({
    where: { id: params.resumeId },
    include: {
      education: true,
      skills: true,
      projects: true,
      workExperience: true,
      certifications: true,
    },
  });

  if (!resumeData) return notFound();

  return <>Hi loaded {resumeData?.title}</>;
}
