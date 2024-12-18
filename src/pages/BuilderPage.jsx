import { useState } from "react";
import PersonalDetails from "../components/forms/PersonalDetails";
import { CVPreview } from "../components/CVPreview";

export default function Builder() {
  const [personalData, setPersonalData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    links: [{ name: "", url: "" }],
  });

  // const [educationData, setEducationData] = useState({
  //   university: "",
  //   city: "",
  //   country: "",
  //   role: "",
  //   yearStart: "",
  //   yearEnd: "",
  //   description: [],
  // });

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
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="order-2 md:order-1">
        <div className="text-3xl">CVKraft</div>
        <div>
          <PersonalDetails data={personalData} onChange={setPersonalData} />
          <div>Education</div>
          <div>Experience</div>
          <div>Skills</div>
        </div>
      </div>
      <div className="order-1 md:order-2 h-screen">
        <CVPreview data={personalData} />
      </div>
    </div>
  );
}
