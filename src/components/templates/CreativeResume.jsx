import { getLinkIcon } from "../../utils/GetLinkIcon";
import convertDate from "../../utils/convertDate";

export default function CreativeCV({
  personalData,
  educationData,
  experienceData,
  projectData,
  skillData,
  selectedColor,
}) {
  const { firstName, lastName, email, phone, links } = personalData;

  return (
    <div className="h-full bg-white p-8 overflow-y-auto">
      <div className="text-center mb-8">
        <h1
          className="text-4xl font-bold mb-3 py-5"
          style={{ backgroundColor: `${selectedColor}26` }}
        >
          {firstName} {lastName}
        </h1>

        <div className="flex flex-wrap justify-center gap-3 text-xs" id="contact">
          {email && (
            <a href={`mailto:${email}`} className="flex items-center gap-1 hover:underline">
              {email}
            </a>
          )}
          {phone && <span>{phone}</span>}
          {links?.map((link, index) => {
            if (!link.url) return null;
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:underline"
                id="icon"
              >
                {getLinkIcon(link.url)}
                {link.name || link.url}
              </a>
            );
          })}
        </div>
      </div>

      {experienceData.some((exp) => exp.company || exp.position) && (
        <section className="mb-8">
          <h2
            className="text-lg font-bold mb-1 px-2"
            style={{ backgroundColor: `${selectedColor}26` }}
          >
            Experience
          </h2>
          {experienceData.map((experience, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start mb-2 px-2">
                <div>
                  <h3 className="text-sm font-bold">{experience.position}</h3>
                  <p className="text-sm text-gray-600">
                    {experience.company}
                    {experience.location.city && `, ${experience.location.city}`}
                    {experience.location.country && `, ${experience.location.country}`}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  {experience.duration.startYear && convertDate(experience.duration.startYear)}
                  {" - "}
                  {experience.current
                    ? "Present"
                    : experience.duration.endYear && convertDate(experience.duration.endYear)}
                </p>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                {experience.responsibilities.map((responsibility, idx) => (
                  <li key={idx}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {educationData.some((edu) => edu.institution || edu.degree) && (
        <section className="mb-8">
          <h2
            className="text-lg font-bold mb-1 px-2"
            style={{ backgroundColor: `${selectedColor}26` }}
          >
            Education
          </h2>
          {educationData.map((education, index) => (
            <div key={index} className="mb-1">
              <div className="flex justify-between items-start px-2">
                <div>
                  <h3 className="text-sm font-bold">{education.institution}</h3>
                  <p className="text-sm">
                    {education.degree} {education.fieldOfStudy && `in ${education.fieldOfStudy}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    {education.location.city}
                    {education.location.country && `, ${education.location.country}`}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  {education.duration.startYear && convertDate(education.duration.startYear)}
                  {" - "}
                  {education.current
                    ? "Present"
                    : education.duration.endYear && convertDate(education.duration.endYear)}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

      {projectData.some((proj) => proj.projectName) && (
        <section className="mb-8">
          <h2
            className="text-lg font-bold mb-1 px-2"
            style={{ backgroundColor: `${selectedColor}26` }}
          >
            Projects
          </h2>
          {projectData.map((project, index) => (
            <div key={index} className="mb-6 px-2">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-sm font-bold">{project.projectName}</h3>
                  <p className="text-sm text-gray-600">{project.role}</p>
                </div>
                <p className="text-sm text-gray-600">{project.date && convertDate(project.date)}</p>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                {project.responsibilities.map((responsibility, idx) => (
                  <li key={idx}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {skillData.some((skill) => skill.category) && (
        <section className="mb-8">
          <h2
            className="text-lg font-bold mb-1 px-2"
            style={{ backgroundColor: `${selectedColor}26` }}
          >
            Skills
          </h2>
          <div className="space-y-1 px-2">
            {skillData.map((skill, index) => {
              if (!skill.category || !skill.skill) return null;
              return (
                <div key={index} className="text-sm">
                  <span className="font-bold">{skill.category}: </span>
                  <span className="text-gray-700">{skill.skill}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
