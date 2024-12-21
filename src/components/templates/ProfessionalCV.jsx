import { getLinkIcon } from "../../utils/GetLinkIcon";
import convertDate from "../../utils/convertDate";

export default function ProfessionalCV({
  personalData,
  educationData,
  experienceData,
  projectData,
  skillData,
}) {
  const { firstName, lastName, email, phone, links } = personalData;

  return (
    <div className="h-full bg-white p-8 overflow-y-auto">
      {/* Header with Name */}
      <div className="border-b pb-4 mb-6 border-gray-400">
        <h1 className="text-4xl font-bold mb-3 text-center">
          {firstName} {lastName}
        </h1>

        {/* Contact Information */}
        <div className="flex flex-wrap text-xs text-gray-600 gap-2 justify-center items-center">
          <a
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline flex
            items-center gap-2"
          >
            {email && <span>{email}</span>}
          </a>
          {phone && <span>| {phone} |</span>}

          {/* Links */}
          {links?.map((link, index) => {
            if (!link.url) return null;

            return (
              <div key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>{getLinkIcon(link.url)}</span>
                  <span>{link.name || link.url}</span>
                  <span className="text-gray-600">|</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        {educationData.some((edu) => edu.institution || edu.degree || edu.fieldOfStudy) && (
          <h2 className="text-lg font-bold mb-3 border-b border-gray-400">Education</h2>
        )}
        {educationData.map((education, index) => {
          if (!education.institution && !education.degree && !education.fieldOfStudy) return null;
          const startDate = education.duration.startYear
            ? convertDate(education.duration.startYear)
            : "";
          const endDate = education.current
            ? "Present"
            : education.duration.endYear
            ? convertDate(education.duration.endYear)
            : "";

          return (
            <div key={index} className="mb-4">
              <div className="text-sm font-bold mb-1 flex justify-between">
                <span>
                  {education.institution}
                  {education.location.city && `, ${education.location.city}`}
                  {education.location.country && `, ${education.location.country}`}
                </span>
                <span>
                  {startDate} - {endDate}
                </span>
              </div>
              <div className="text-sm">
                {education.degree} {education.fieldOfStudy && `in ${education.fieldOfStudy}`}
              </div>
            </div>
          );
        })}
      </div>

      {/* Experience */}
      <div className="mb-6">
        {experienceData.some((exp) => exp.company || exp.position) && (
          <h2 className="text-lg font-bold mb-3 border-b border-gray-400">Experience</h2>
        )}
        {experienceData.map((experience, index) => {
          if (!experience.company && !experience.position) return null;
          const startDate = experience.duration.startYear
            ? convertDate(experience.duration.startYear)
            : "";
          const endDate = experience.current
            ? "Present"
            : experience.duration.endYear
            ? convertDate(experience.duration.endYear)
            : "";

          return (
            <div key={index} className="mb-4">
              <div className="text-sm font-bold mb-1 flex justify-between">
                <span>{experience.position}</span>
                <span>
                  {startDate} - {endDate}
                </span>
              </div>
              <div className="text-sm mb-2">
                {experience.company}
                {experience.location.city && `, ${experience.location.city}`}
                {experience.location.country && `, ${experience.location.country}`}
              </div>
              <ul className="list-disc list-inside text-sm space-y-1">
                {experience.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Project */}
      <div className="mb-6">
        {projectData.some((prj) => prj.projectName || prj.role) && (
          <h2 className="text-lg font-bold mb-3 border-b border-gray-400">Projects</h2>
        )}
        {projectData.map((project, index) => {
          if (!project.projectName && !project.role) return null;
          const date = project.date ? convertDate(project.date) : "";

          return (
            <div key={index} className="mb-4">
              <div className="text-sm font-bold mb-1 flex justify-between">
                <span>{project.projectName}</span>
                <span>{date}</span>
              </div>
              <div className="text-sm mb-2">{project.role}</div>
              <ul className="list-disc list-inside text-sm space-y-1">
                {project.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Skills */}
      <div className="mb-6">
        {skillData.some((skill) => skill.category) && (
          <h2 className="text-lg font-bold mb-3 border-b border-gray-400">Skills</h2>
        )}
        <div className="space-y-2">
          {skillData.map((skill, index) => {
            if (!skill.category && !skill.skill) return null;
            return (
              <div key={index} className="text-sm">
                <span className="font-bold">{skill.category}: </span>
                <span>{skill.skill}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
