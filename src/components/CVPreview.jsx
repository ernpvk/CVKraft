import { memo } from "react";
import { getLinkIcon } from "../utils/GetLinkIcon";
import convertDate from "../utils/convertDate";

export const CVPreview = memo(function CVPreview({
  personalData,
  educationData,
  experienceData,
  projectData,
}) {
  // if (!personalData) {
  //   return (
  //     <div className="h-full flex items-center justify-center text-gray-500">
  //       Start filling out your information to see the preview
  //     </div>
  //   );
  // }

  const { firstName, lastName, email, phone, links } = personalData;

  return (
    <div className="h-full bg-white p-8 overflow-y-auto">
      {/* Header with Name */}
      <div className="border-b pb-6 mb-6 border-gray-400 ">
        <h1 className="text-3xl font-bold mb-2 text-center">
          {firstName} {lastName}
        </h1>

        {/* Contact Information */}
        <div className="flex flex-wrap text-xs text-gray-600 gap-2 justify-center items-center">
          <a
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline flex items-center gap-2"
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
      <div className="mb-4">
        {educationData.some((edu) => edu.institution || edu.degree || edu.fieldOfStudy) && (
          <h1 className="text-md font-bold mb-2 border-b border-gray-400">Education</h1>
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
            <div key={index} className="mb-2">
              <span className="text-xs font-bold mb-1 flex justify-between">
                <span>
                  {education.institution}
                  {education.location.city && `, ${education.location.city}`}
                </span>
                <span>
                  {startDate} - {endDate}
                </span>
              </span>
              <div className="text-xs mb-2">
                {education.degree} {education.fieldOfStudy && `in ${education.fieldOfStudy}`}
              </div>
            </div>
          );
        })}
      </div>
      {/* Experience */}
      <div className="mb-4">
        {experienceData.some((exp) => exp.company || exp.position) && (
          <h1 className="text-md font-bold mb-2 border-b border-gray-400">Experience</h1>
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
            <div key={index} className="mb-2">
              <span className="text-xs font-bold mb-1 flex justify-between">
                <span>{experience.position}</span>
                <span>
                  {startDate} - {endDate}
                </span>
              </span>
              <div className="text-xs mb-2">
                {experience.company}
                {experience.location.city && `, ${experience.location.city}`}
                {experience.location.country && `, ${experience.location.country}`}
              </div>
              <div className="text-xs mb-2">
                <ul className="list-disc list-inside">
                  {experience.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      {/* Project */}
      <div className="mb-4">
        {projectData.some((prj) => prj.projectName || prj.role) && (
          <h1 className="text-md font-bold mb-2 border-b border-gray-400">Project</h1>
        )}
        {projectData.map((project, index) => {
          if (!project.projectName && !project.role) return null;
          const date = project.date ? convertDate(project.date) : "";

          return (
            <div key={index} className="mb-2">
              <span className="text-xs font-bold mb-1 flex justify-between">
                <span>{project.projectName}</span>
                <span>{date}</span>
              </span>
              <div className="text-xs mb-2">{project.role}</div>
              <div className="text-xs mb-2">
                <ul className="list-disc list-inside">
                  {project.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
