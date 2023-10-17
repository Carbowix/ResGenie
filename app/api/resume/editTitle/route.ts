import { z } from 'zod';
import { getAuthSession } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const userSession = await getAuthSession();
    if (!userSession)
      return Response.json({ message: 'Unauthorized access' }, { status: 401 });
    const body = await req.json();
    const { resumeTitle, resumeId } = z
      .object({ resumeTitle: z.string(), resumeId: z.string() })
      .parse(body);
    const resumeExists = await prisma.resume.findUnique({
      where: {
        id: resumeId,
      },
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    if (resumeExists) {
      if (resumeExists.userId !== userSession.user.id)
        return Response.json(
          { message: 'Unauthorized access' },
          { status: 401 }
        );
      await prisma.resume.update({
        where: { id: resumeId },
        data: {
          title: resumeTitle,
        },
      });
      return Response.json(
        { message: 'Successfuly updated title' },
        { status: 200 }
      );
    }
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
