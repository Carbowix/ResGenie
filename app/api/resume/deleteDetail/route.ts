import { z } from 'zod';
import { getAuthSession } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import type { sectionType } from '@/components/resume/resume-section-list';

export async function POST(req: Request) {
  try {
    const userSession = await getAuthSession();
    if (!userSession)
      return Response.json({ message: 'Unauthorized access' }, { status: 401 });
    const body = await req.json();
    const { sectionName, sectionItemId } = z
      .object({
        sectionName: z.string(),
        sectionItemId: z.number(),
      })
      .parse(body);

    switch (sectionName as sectionType) {
      case 'education':
        await prisma.education.delete({ where: { id: sectionItemId } });
        break;
      case 'work':
        await prisma.workExperience.delete({ where: { id: sectionItemId } });
        break;
      case 'projects':
        await prisma.project.delete({ where: { id: sectionItemId } });
        break;
      case 'certificates':
        await prisma.certification.delete({ where: { id: sectionItemId } });
        break;
      case 'skills':
        await prisma.skill.delete({ where: { id: sectionItemId } });
        break;
      case 'links':
        await prisma.profileLink.delete({ where: { id: sectionItemId } });
        break;
      default:
        return Response.json(
          { message: 'Invalid Section Name/ID' },
          { status: 404 }
        );
    }
    return Response.json({ message: 'OK' }, { status: 200 });
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
