import { getLinkIcon } from "../../utils/GetLinkIcon";
import convertDate from "../../utils/convertDate";

export default function ModernResume({
  personalData,
  educationData,
  experienceData,
  projectData,
  skillData,
  accentColor,
}) {
  const { firstName, lastName, email, phone, links } = personalData;

  return (
    <div className="h-full flex">
      <div className={`w-1/3 p-8 bg-gray-50/80`}>
        <div className="space-y-8">
          <h1 className="text-2xl font-bold text-gray-800 break-words">
            {firstName} {lastName}
          </h1>

          <div>
            {email && (
              <h2 className={`text-md font-bold mb-2 pb-1 border-b ${accentColor}`}>
                Contact Info
              </h2>
            )}
            <div className="space-y-2 text-xs">
              {email && (
                <a href={`mailto:${email}`} className="hover:underline">
                  {email}
                </a>
              )}
              {phone && <div>{phone}</div>}

              {links?.map((link, index) => {
                if (!link.url) return null;
                return (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    {getLinkIcon(link.url)}
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {link.name || link.url}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
          {educationData.some((edu) => edu.institution) && (
            <section>
              <h2 className={`text-md font-bold mb-2 pb-1 border-b ${accentColor}`}>Education</h2>
              {educationData.map((education, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <div className="font-bold">{education.institution}</div>
                      <div>
                        {education.degree}{" "}
                        {education.fieldOfStudy && `in ${education.fieldOfStudy}`}
                      </div>
                      <div className="text-gray-600 pt-1">
                        {education.duration.startYear && convertDate(education.duration.startYear)}
                        {" - "}
                        {education.current
                          ? "Present"
                          : education.duration.endYear && convertDate(education.duration.endYear)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skillData.some((skill) => skill.category) && (
            <div>
              <h2 className={`${accentColor} text-md font-bold mb-2 pb-1  border-b`}>Skills</h2>
              <div className="space-y-2">
                {skillData.map((skill, index) => {
                  if (!skill.category && !skill.skill) return null;
                  return (
                    <div key={index} className="text-xs">
                      <span className="font-semibold">{skill.category}: </span>
                      <span>{skill.skill}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white">
        {/* Experience Section */}
        {experienceData.some((exp) => exp.company || exp.position) && (
          <section className="mb-6">
            <h2 className={`text-md font-bold mb-4 pb-1 border-b ${accentColor}`}>Experience</h2>
            {experienceData.map((experience, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start text-xs">
                  <div>
                    <div className="font-bold">{experience.position}</div>
                    <div>
                      {experience.company}
                      {experience.location.city && `, ${experience.location.city}`}
                    </div>
                  </div>
                  <div className="text-gray-600">
                    {experience.duration.startYear && convertDate(experience.duration.startYear)}
                    {" - "}
                    {experience.current
                      ? "Present"
                      : experience.duration.endYear && convertDate(experience.duration.endYear)}
                  </div>
                </div>
                <ul className="list-disc list-inside text-xs mt-2 space-y-1">
                  {experience.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Education Section */}

        {/* Projects Section */}
        {projectData.some((proj) => proj.projectName) && (
          <section className="mb-6">
            <h2 className={`text-md font-bold mb-4 pb-1 border-b ${accentColor}`}>Projects</h2>
            {projectData.map((project, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start text-xs">
                  <div>
                    <div className="font-bold">{project.projectName}</div>
                    <div>{project.role}</div>
                  </div>
                  <div className="text-gray-600">{project.date && convertDate(project.date)}</div>
                </div>
                <ul className="list-disc list-inside text-xs mt-2 space-y-1">
                  {project.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
