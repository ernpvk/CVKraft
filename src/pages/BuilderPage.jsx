import { useState, useRef } from "react";
import PersonalDetails from "../components/forms/PersonalDetails";
import Education from "../components/forms/Education";
import { CVPreview } from "../components/CVPreview";
import Experience from "../components/forms/Experience";
import Project from "../components/forms/Projects";
import Skill from "../components/forms/Skills";
import CVKraftIcon from "../assets/icons/CVKraft.png";
import TemplateSelector from "../components/templates/TemplateSelector";
import { exampleData } from "../utils/exampleData";
import ExportButton from "../components/ExportButton.jsx";

export default function Builder() {
  const cvRef = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [selectedColor, setSelectedColor] = useState("#4477CE");

  const loadExampleData = () => {
    setPersonalData(exampleData.personalData);
    setEducationData(exampleData.educationData);
    setExperienceData(exampleData.experienceData);
    setProjectData(exampleData.projectData);
    setSkillData(exampleData.skillData);
  };

  const clearAllData = () => {
    setPersonalData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      links: [{ name: "", url: "" }],
    });
    setEducationData([
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        location: { city: "", country: "" },
        duration: { startYear: "", endYear: "" },
        current: false,
      },
    ]);
    setExperienceData([
      {
        company: "",
        position: "",
        location: { city: "", country: "" },
        duration: { startYear: "", endYear: "" },
        current: false,
        responsibilities: [""],
      },
    ]);
    setProjectData([
      {
        projectName: "",
        role: "",
        date: "",
        responsibilities: [""],
      },
    ]);
    setSkillData([
      {
        category: "",
        skill: "",
      },
    ]);
  };

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
        <div className="flex justify-between items-center ">
          <div className="text-3xl mb-4 flex items-center gap-2">
            <img src={CVKraftIcon} alt="CVKraft" className="h-8 w-8 object-contain" />
            <span>Kraft</span>
          </div>
          <div>
            {" "}
            <ExportButton cvRef={cvRef} />
          </div>
        </div>

        <div className="flex gap-2 pb-4">
          <button
            onClick={loadExampleData}
            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            Load Example
          </button>
          <button
            onClick={clearAllData}
            className="px-3 py-1 text-sm text-red-600 hover:text-red-700 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            Clear All
          </button>
        </div>
        <div>
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            selectedColor={selectedColor}
            onTemplateChange={setSelectedTemplate}
            onColorChange={setSelectedColor}
          />
          <PersonalDetails data={personalData} onChange={setPersonalData} />
          <Education data={educationData} onChange={setEducationData} />
          <Experience data={experienceData} onChange={setExperienceData} />
          <Project data={projectData} onChange={setProjectData} />
          <Skill data={skillData} onChange={setSkillData} />
        </div>
      </div>

      <div className="col-span-2 order-1 md:order-2 h-[50vh] md:h-screen p-4 md:p-8 overflow-auto bg-gray-100">
        <div
          ref={cvRef}
          className="w-full md:w-[210mm] mx-auto bg-white shadow-lg min-h-[297mm] scale-[0.7] md:scale-100 origin-top"
        >
          <CVPreview
            personalData={personalData}
            educationData={educationData}
            experienceData={experienceData}
            projectData={projectData}
            skillData={skillData}
            template={selectedTemplate}
            selectedColor={selectedColor}
          />
        </div>
      </div>
    </div>
  );
}
