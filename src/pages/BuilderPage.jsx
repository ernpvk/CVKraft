import { useState } from "react";
import PersonalDetails from "../components/forms/PersonalDetails";
import Education from "../components/forms/Education";
import { CVPreview } from "../components/CVPreview";
import Experience from "../components/forms/Experience";
import Project from "../components/forms/Projects";
import Skill from "../components/forms/Skills";
import CVKraftIcon from "../assets/icons/CVKraft.png";

export default function Builder() {
  const [selectedTemplate, setSelectedTemplate] = useState("Template1");
  const [personalData, setPersonalData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    links: [{ name: "", url: "" }],
  });

  const [educationData, setEducationData] = useState([
    {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      location: {
        city: "",
        country: "",
      },
      duration: {
        startYear: "",
        endYear: "",
      },
      current: false,
    },
  ]);

  const [experienceData, setExperienceData] = useState([
    {
      company: "",
      position: "",
      location: {
        city: "",
        country: "",
      },
      duration: {
        startYear: "",
        endYear: "",
      },
      current: false,
      responsibilities: [""],
    },
  ]);

  const [projectData, setProjectData] = useState([
    {
      projectName: "",
      role: "",
      date: "",
      responsibilities: [""],
    },
  ]);

  const [skillData, setSkillData] = useState([
    {
      category: "",
      skill: "",
    },
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
      <div className="col-span-1 order-2 md:order-1 h-[50vh] md:h-screen overflow-y-auto p-5 bg-white">
        <div className="text-3xl mb-4 flex items-center gap-2">
          <img src={CVKraftIcon} alt="CVKraft" className="h-8 w-8 object-contain" />
          <span>Kraft</span>
        </div>
        <div>
          <PersonalDetails data={personalData} onChange={setPersonalData} />
          <Education data={educationData} onChange={setEducationData} />
          <Experience data={experienceData} onChange={setExperienceData} />
          <Project data={projectData} onChange={setProjectData} />
          <Skill data={skillData} onChange={setSkillData} />
        </div>
      </div>

      <div className="col-span-2 order-1 md:order-2 h-[50vh] md:h-screen p-4 md:p-8 overflow-auto bg-gray-100">
        <div className="w-full md:w-[210mm] mx-auto bg-white shadow-lg min-h-[297mm] scale-[0.7] md:scale-100 origin-top">
          <CVPreview
            personalData={personalData}
            educationData={educationData}
            experienceData={experienceData}
            projectData={projectData}
            skillData={skillData}
            template={selectedTemplate}
          />
        </div>
      </div>
    </div>
  );
}
