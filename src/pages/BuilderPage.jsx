import { useState } from "react";
import PersonalDetails from "../components/forms/PersonalDetails";
import Education from "../components/forms/Education";
import { CVPreview } from "../components/CVPreview";

export default function Builder() {
  const [personalData, setPersonalData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    links: [{ name: "", url: "" }],
  });

  const [educationData, setEducationData] = useState({
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
  });

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
      <div className="col-span-1 order-2 md:order-1">
        <div className="text-3xl">CVKraft</div>
        <div>
          <PersonalDetails data={personalData} onChange={setPersonalData} />
          <Education data={educationData} onChange={setEducationData} />
          <div>Experience</div>
          <div>Skills</div>
        </div>
      </div>
      <div className="col-span-2 order-1 md:order-2 h-screen">
        <CVPreview personalData={personalData} educationData={educationData} />
      </div>
    </div>
  );
}
