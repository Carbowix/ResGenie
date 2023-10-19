import { z } from 'zod';
import { getAuthSession } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import type { sectionType } from '@/components/resume/resume-section-list';
import type {
  Certification,
  Education,
  ProfileLink,
  Project,
  Skill,
  WorkExperience,
} from '@prisma/client';

export async function POST(req: Request) {
  try {
    const userSession = await getAuthSession();
    if (!userSession)
      return Response.json({ message: 'Unauthorized access' }, { status: 401 });
    const body = await req.json();
    const { sectionName, resumeId, isEdit, data } = z
      .object({
        sectionName: z.string(),
        resumeId: z.string(),
        isEdit: z.boolean(),
        data: z.unknown(),
      })
      .parse(body);

    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
    if (resume) {
      switch (sectionName as sectionType) {
        case 'education':
          const educationData = data as Education;
          if (isEdit) {
            await prisma.education.update({
              where: { id: educationData.id },
              data: {
                school: educationData.school,
                degree: educationData.degree,
                startDate: educationData.startDate,
                graduation: educationData.graduation,
              },
            });
          } else {
            await prisma.education.create({
              data: {
                school: educationData.school,
                degree: educationData.degree,
                startDate: educationData.startDate,
                graduation: educationData.graduation,
                resume: {
                  connect: {
                    id: resume.id,
                  },
                },
              },
            });
          }
          break;
        case 'work':
          const workData = data as WorkExperience;
          if (isEdit) {
            await prisma.workExperience.update({
              where: { id: workData.id },
              data: {
                company: workData.company,
                position: workData.position,
                startDate: workData.startDate,
                endDate: workData.endDate,
                responsibilities: workData.responsibilities,
              },
            });
          } else {
            await prisma.workExperience.create({
              data: {
                company: workData.company,
                position: workData.position,
                startDate: workData.startDate,
                endDate: workData.endDate,
                responsibilities: workData.responsibilities,
                resume: {
                  connect: {
                    id: resume.id,
                  },
                },
              },
            });
          }
          break;
        case 'projects':
          const projectData = data as Project;
          if (isEdit) {
            await prisma.project.update({
              where: { id: projectData.id },
              data: {
                name: projectData.name,
                description: projectData.description,
                startDate: projectData.startDate,
                endDate: projectData.endDate,
              },
            });
          } else {
            await prisma.project.create({
              data: {
                name: projectData.name,
                description: projectData.description,
                startDate: projectData.startDate,
                endDate: projectData.endDate,
                resume: {
                  connect: {
                    id: resume.id,
                  },
                },
              },
            });
          }
          break;
        case 'certificates':
          const certificateData = data as Certification;
          if (isEdit) {
            await prisma.certification.update({
              where: { id: certificateData.id },
              data: {
                name: certificateData.name,
                issuingAuthority: certificateData.issuingAuthority,
                date: certificateData.date,
              },
            });
          } else {
            await prisma.certification.create({
              data: {
                name: certificateData.name,
                issuingAuthority: certificateData.issuingAuthority,
                date: certificateData.date,
                resume: {
                  connect: {
                    id: resume.id,
                  },
                },
              },
            });
          }
          break;
        case 'skills':
          const skillsData = data as Skill;
          if (isEdit) {
            await prisma.skill.update({
              where: { id: skillsData.id },
              data: {
                header: skillsData.header,
                skills: skillsData.skills,
              },
            });
          } else {
            await prisma.skill.create({
              data: {
                header: skillsData.header,
                skills: skillsData.skills,
                resume: {
                  connect: {
                    id: resume.id,
                  },
                },
              },
            });
          }
          break;

        case 'links':
          const linkData = data as ProfileLink;
          if (isEdit) {
            await prisma.profileLink.update({
              where: { id: linkData.id },
              data: {
                link: linkData.link,
              },
            });
          } else {
            await prisma.profileLink.create({
              data: {
                link: linkData.link,
                resume: {
                  connect: {
                    id: resume.id,
                  },
                },
              },
            });
          }
          break;
        default:
          return Response.json(
            { message: 'Invalid Section Name/Data' },
            { status: 404 }
          );
      }
      return Response.json({ message: 'OK' }, { status: 200 });
    }

    return Response.json({ message: 'Invalid Resume' }, { status: 404 });
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
