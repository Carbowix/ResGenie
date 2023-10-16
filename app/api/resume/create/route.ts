import prisma from '@/lib/prisma';
import { z } from 'zod';
import { getAuthSession } from '../../auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    const userSession = await getAuthSession();
    if (!userSession)
      return Response.json({ message: 'Unauthorized access' }, { status: 401 });
    const body = await req.json();
    const { resumeTitle, isPublic } = z
      .object({ resumeTitle: z.string(), isPublic: z.boolean() })
      .parse(body);
    const userExists = await prisma.user.findFirst({
      where: {
        id: userSession.user.id,
      },
    });

    if (userExists) {
      const newResume = await prisma.resume.create({
        data: {
          title: resumeTitle,
          isPublic: isPublic,
          user: {
            connect: {
              id: userExists.id,
            },
          },
        },
      });

      if (newResume) {
        return Response.json(
          { message: 'Successfuly Created', resumeId: newResume.id },
          { status: 200 }
        );
      }
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
