import { memo } from "react";
import ProfessionalCV from "./templates/ProfessionalCV";
import ModernResume from "./templates/ModernResume";
import CreativeCV from "./templates/CreativeResume";

export const CVPreview = memo(function CVPreview({
  personalData,
  educationData,
  experienceData,
  projectData,
  skillData,
  template = "professional",
  selectedColor = "#4477CE",
}) {
  const renderTemplate = () => {
    const props = {
      personalData,
      educationData,
      experienceData,
      projectData,
      skillData,
    };

    switch (template) {
      case "modern":
        return <ModernResume {...props} selectedColor={selectedColor} />;
      case "creative":
        return <CreativeCV {...props} selectedColor={selectedColor} />;
      default:
        return <ProfessionalCV {...props} />;
    }
  };

  return <div className="h-full bg-white overflow-hidden">{renderTemplate()}</div>;
});
