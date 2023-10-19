'use client';
import { formatDate } from '@/lib/util';
import {
  Certification,
  Education,
  ProfileLink,
  Project,
  Resume,
  Skill,
  User,
  WorkExperience,
} from '@prisma/client';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  PDFViewer,
} from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
export default function ResumeViewer({
  username,
  resumeData,
}: {
  resumeData: Resume & {
    education: Education[];
    workExperience: WorkExperience[];
    skills: Skill[];
    certifications: Certification[];
    projects: Project[];
    profileLinks: ProfileLink[];
    user: User;
  };
  username: string;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const styles = StyleSheet.create({
    page: {
      padding: 10,
      backgroundColor: '#E4E4E4',
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      '@media max-width: 400': {
        flexDirection: 'column',
      },
    },

    section: {
      width: '100%',
      padding: 10,
    },

    linksContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: 3,
      paddingBottom: 5,
      borderBottomWidth: 2,
      borderBottomColor: '#112131',
      borderBottomStyle: 'solid',
      alignItems: 'stretch',
    },
    detailColumn: {
      flexDirection: 'column',
      flexGrow: 9,
      textTransform: 'uppercase',
    },
    linkColumn: {
      flexDirection: 'column',
      flexGrow: 2,
      alignSelf: 'flex-end',
      justifySelf: 'flex-end',
    },
    name: {
      fontSize: 24,
    },
    subtitle: {
      fontSize: 14,
    },
    link: {
      fontSize: 10,
      color: 'black',
      textDecoration: 'none',
    },
    sectionHeading: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    divider: {
      backgroundColor: 'gray',
      height: 1,
      marginVertical: 10,
    },
    objectiveText: {
      fontSize: 16,
    },

    educationItem: {
      marginBottom: 20,
    },
    educationTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    educationTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    educationSubtitle: {
      fontSize: 12,
    },
    educationInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    educationDate: {
      fontSize: 12,
      color: 'gray',
    },

    experienceItem: {
      marginBottom: 20,
    },
    jobTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    companyInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    companyName: {
      fontSize: 14,
    },
    dateRange: {
      fontSize: 12,
      color: 'gray',
    },
    bulletPoint: {
      fontSize: 12,
      marginLeft: 20,
    },
    projectItem: {
      marginBottom: 20,
    },
    projectHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    projectTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    projectDescription: {
      fontSize: 14,
    },
    certificationItem: {
      marginBottom: 20,
    },
    certificationTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    certificationIssuer: {
      fontSize: 14,
    },
    certificationDate: {
      fontSize: 12,
      color: 'gray',
    },
    skillCategory: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
    },
    skillList: {
      fontSize: 14,
      marginLeft: 20,
    },
    skill: {
      fontWeight: 'bold',
    },
  });
  return (
    <>
      {isClient ? (
        <div className="w-full h-full justify-center items-center bg-red-50 flex-1">
          <PDFViewer style={{ width: '100%', height: '100%' }} showToolbar>
            <Document author={username} title={`${username}'s Resume`}>
              <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 5,
                      alignItems: 'center',
                    }}
                  >
                    <Text style={styles.name}>{resumeData.fullName}</Text>
                    <Text style={styles.subtitle}>{resumeData.title}</Text>
                    <View style={styles.linksContainer}>
                      <Text style={styles.link}>{resumeData.location}</Text>
                      <Link
                        src={`mailto:${resumeData.email}`}
                        style={styles.link}
                      >
                        {resumeData.email}
                      </Link>
                      <Link
                        src={`tel:${resumeData.phoneNumber}`}
                        style={styles.link}
                      >
                        {resumeData.phoneNumber}
                      </Link>
                      <Text style={styles.link}>
                        {formatDate(resumeData.birthday || '')}
                      </Text>
                      {resumeData.profileLinks.map((profileLink) => {
                        return (
                          <Link src={profileLink.link} style={styles.link}>
                            {profileLink.link}
                          </Link>
                        );
                      })}
                    </View>
                  </View>
                </View>
                {resumeData.objective && (
                  <View style={styles.section}>
                    <Text style={styles.sectionHeading}>OBJECTIVE</Text>
                    <View style={styles.divider} />
                    <Text style={styles.objectiveText}>
                      {resumeData.objective}
                    </Text>
                  </View>
                )}

                {resumeData.education.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionHeading}>EDUCATION</Text>
                    <View style={styles.divider} />
                    {resumeData.education.map((eduItem) => {
                      return (
                        <View style={styles.educationItem}>
                          <View style={styles.educationTitleContainer}>
                            <Text style={styles.educationTitle}>
                              {eduItem.degree}
                            </Text>
                          </View>
                          <View style={styles.educationInfo}>
                            <Text style={styles.educationSubtitle}>
                              {eduItem.school}
                            </Text>
                            <Text style={styles.educationDate}>
                              {formatDate(eduItem.startDate)} -{' '}
                              {formatDate(eduItem.graduation)}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                )}

                {resumeData.workExperience.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionHeading}>EXPERIENCE</Text>
                    <View style={styles.divider} />
                    {resumeData.workExperience.map((work) => {
                      return (
                        <View style={styles.experienceItem}>
                          <Text style={styles.jobTitle}>{work.position}</Text>
                          <View style={styles.companyInfo}>
                            <Text style={styles.companyName}>
                              {work.company}
                            </Text>
                            <Text style={styles.dateRange}>
                              {formatDate(work.startDate)} -{' '}
                              {formatDate(work.endDate)}
                            </Text>
                          </View>
                          <Text style={styles.bulletPoint}>
                            • {work.responsibilities}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}

                {resumeData.projects.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionHeading}>PROJECTS</Text>
                    <View style={styles.divider} />
                    {resumeData.projects.map((project) => {
                      return (
                        <View style={styles.projectItem}>
                          <View style={styles.projectHeader}>
                            <Text style={styles.projectTitle}>
                              {project.name}
                            </Text>
                            <Text style={styles.dateRange}>
                              {formatDate(project.startDate)} -{' '}
                              {formatDate(project.endDate)}
                            </Text>
                          </View>
                          <Text style={styles.projectDescription}>
                            {project.description}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}

                {resumeData.certifications.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionHeading}>CERTIFICATIONS</Text>
                    <View style={styles.divider} />
                    {resumeData.certifications.map((certif) => {
                      return (
                        <View style={styles.certificationItem}>
                          <Text style={styles.certificationTitle}>
                            {certif.name}
                          </Text>
                          <Text style={styles.certificationIssuer}>
                            {certif.issuingAuthority}
                          </Text>
                          <Text style={styles.certificationDate}>
                            {formatDate(certif.date)}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}

                {resumeData.skills.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionHeading}>SKILLS</Text>
                    <View style={styles.divider} />
                    {resumeData.skills.map((skill) => {
                      return (
                        <View>
                          <Text style={styles.skillCategory}>
                            {skill.header}:
                          </Text>
                          <Text style={styles.skillList}>• {skill.skills}</Text>
                        </View>
                      );
                    })}
                  </View>
                )}
              </Page>
            </Document>
          </PDFViewer>
        </div>
      ) : null}
    </>
  );
}
