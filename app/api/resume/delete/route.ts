import { z } from 'zod';
import { getAuthSession } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const userSession = await getAuthSession();
    if (!userSession)
      return Response.json({ message: 'Unauthorized access' }, { status: 401 });
    const body = await req.json();
    const { resumeId } = z.object({ resumeId: z.string() }).parse(body);

    const resume = await prisma.resume.findFirst({
      where: {
        AND: [{ id: resumeId }, { userId: userSession.user.id }],
      },
    });

    if (!resume)
      return Response.json({ message: 'ResumeId invalid' }, { status: 404 });

    await prisma.resume.delete({
      where: {
        id: resumeId,
      },
    });

    return Response.json({ message: 'Resume deleted' }, { status: 200 });
  } catch (e) {
    console.log(e);
    if (e instanceof z.ZodError) {
      return Response.json(
        { message: 'Invalid request payload' },
        { status: 422 }
      );
    }

    return Response.json({ message: 'Invalid request' }, { status: 400 });
  }
}
