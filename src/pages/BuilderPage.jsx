import { useState } from "react";
import PersonalDetails from "../components/forms/PersonalDetails";
import Education from "../components/forms/Education";
import { CVPreview } from "../components/CVPreview";
import Experience from "../components/forms/Experience";

export default function Builder() {
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

  // const [experienceData, setExperienceData] = useState({
  //   company: "",
  //   city: "",
  //   country: "",
  //   role: "",
  //   yearStart: "",
  //   yearEnd: "",
  //   description: [],
  // });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
      <div className="col-span-1 order-2 md:order-1 overflow-none md:overflow-y-auto p-5">
        <div className="text-3xl">CVKraft</div>
        <div>
          <PersonalDetails data={personalData} onChange={setPersonalData} />
          <Education data={educationData} onChange={setEducationData} />
          <Experience data={experienceData} onChange={setExperienceData} />
          <div>Skills</div>
        </div>
      </div>
      <div className="col-span-2 order-1 md:order-2 h-[1123.62px] ">
        <CVPreview
          personalData={personalData}
          educationData={educationData}
          experienceData={experienceData}
        />
      </div>
    </div>
  );
}
