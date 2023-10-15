import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/userUtil';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { password, username } = z
      .object({ username: z.string(), password: z.string() })
      .parse(body);
    const userExists = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (userExists) {
      return Response.json(
        { error: 'An account with same email or username already exists' },
        { status: 400 }
      );
    } else {
      const user = await prisma.user.create({
        data: {
          username,

          password: await hashPassword(password),
        },
      });
      return Response.json(user);
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
