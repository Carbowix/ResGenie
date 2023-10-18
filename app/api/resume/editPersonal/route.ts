import prisma from '@/lib/prisma';
import { z } from 'zod';
import { getAuthSession } from '../../auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    const userSession = await getAuthSession();
    if (!userSession)
      return Response.json({ message: 'Unauthorized access' }, { status: 401 });
    const body = await req.json();
    console.log(body);
    const { resumeId, data } = z
      .object({
        resumeId: z.string(),
        data: z.object({
          fullName: z.string(),
          email: z.string(),
          phoneNumber: z.string(),
          objective: z.string(),
          location: z.string(),
          birthday: z.string(),
          isPublic: z.boolean(),
        }),
      })
      .parse(body);

    const resume = await prisma.resume.findFirst({
      where: {
        AND: [{ id: resumeId }, { userId: userSession.user.id }],
      },
    });

    if (!resume)
      return Response.json({ message: 'Invalid resume' }, { status: 404 });
    await prisma.resume.update({ where: { id: resumeId }, data: { ...data } });
    return Response.json({ message: 'Saved Successfuly' }, { status: 200 });
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
