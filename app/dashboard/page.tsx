import { notFound } from 'next/navigation';
import { getAuthSession } from '../api/auth/[...nextauth]/route';
import DashboardBar from '@/components/dashboard/dashboard-bar';
import DashboardList from '../../components/dashboard/dashboard-list';
import prisma from '@/lib/prisma';

export default async function DashboardPage() {
  const userSession = await getAuthSession();
  if (!userSession) return notFound();
  const allResumes = await prisma.user.findUnique({
    where: {
      id: userSession.user.id,
    },
    select: {
      resumes: {
        select: {
          id: true,
          title: true,
          updatedAt: true,
        },
      },
    },
  });
  return (
    <div className="w-screen h-screen bg-[#131112] text-white p-4">
      <div className="flex flex-col gap-y-4 w-full h-full md:w-[60%] mx-auto px-2">
        <DashboardBar username={userSession.user.username!} />
        <hr className="style-six" />
        <DashboardList initResumes={allResumes?.resumes!} />
      </div>
    </div>
  );
}
