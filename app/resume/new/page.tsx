import { getAuthSession } from '@/app/api/auth/[...nextauth]/route';
import NewResume from '@/components/resume/new-resume';
import { notFound } from 'next/navigation';

export default async function NewResumePage() {
  const userSession = await getAuthSession();
  if (!userSession) return notFound();
  return (
    <div className="w-screen h-screen bg-[#131112] text-white flex justify-center items-center p-4">
      <NewResume />
    </div>
  );
}
