import { useState } from "react";
import InputField from "./InputField";

export default function Experience({ data, onChange }) {
  const [isOpen, setIsOpen] = useState(true);

  const addExperience = () => {
    onChange([
      ...data,
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
  };

  const removeExperience = (index) => {
    const updatedExperience = data.filter((_, i) => i !== index);
    onChange(updatedExperience);
  };

  const updateField = (index, name, value) => {
    const updatedExperience = [...data];

    if (name === "city" || name === "country") {
      updatedExperience[index] = {
        ...updatedExperience[index],
        location: {
          ...updatedExperience[index].location,
          [name]: value,
        },
      };
    } else if (name === "startYear" || name === "endYear") {
      updatedExperience[index] = {
        ...updatedExperience[index],
        duration: {
          ...updatedExperience[index].duration,
          [name]: value,
        },
      };
    } else {
      updatedExperience[index] = {
        ...updatedExperience[index],
        [name]: value,
      };
    }
    onChange(updatedExperience);
  };

  const addResponsibility = (experienceIndex) => {
    const updatedExperience = [...data];
    updatedExperience[experienceIndex] = {
      ...updatedExperience[experienceIndex],
      responsibilities: [...updatedExperience[experienceIndex].responsibilities, ""],
    };
    onChange(updatedExperience);
  };

  const removeResponsibility = (experienceIndex, responsibilityIndex) => {
    const updatedExperience = [...data];
    updatedExperience[experienceIndex] = {
      ...updatedExperience[experienceIndex],
      responsibilities: updatedExperience[experienceIndex].responsibilities.filter(
        (_, i) => i !== responsibilityIndex
      ),
    };
    onChange(updatedExperience);
  };

  const updateResponsibility = (experienceIndex, responsibilityIndex, value) => {
    const updatedExperience = [...data];
    const responsibilities = [...updatedExperience[experienceIndex].responsibilities];

    responsibilities[responsibilityIndex] = value;

    updatedExperience[experienceIndex] = {
      ...updatedExperience[experienceIndex],
      responsibilities: responsibilities,
    };

    onChange(updatedExperience);
  };

  return (
    <div className="border rounded-lg mb-4">
      <button
        className="w-full p-4 text-left font-medium flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Experience</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="p-4 space-y-4">
          {data.map((experience, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Experience #{index + 1}</h3>
                {data.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <InputField
                    label="Company"
                    name="company"
                    value={experience.institution}
                    onChange={(e) => updateField(index, e.target.name, e.target.value)}
                    required
                  />
                  <InputField
                    label="Job Title"
                    name="position"
                    value={experience.position}
                    onChange={(e) => updateField(index, e.target.name, e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="City"
                    name="city"
                    value={experience.location.city}
                    onChange={(e) => updateField(index, e.target.name, e.target.value)}
                  />
                  <InputField
                    label="Country"
                    name="country"
                    value={experience.location.country}
                    onChange={(e) => updateField(index, e.target.name, e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium">Duration</label>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Start</label>
                      <input
                        type="month"
                        value={experience.duration.startYear}
                        onChange={(e) => updateField(index, "startYear", e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:outline-none border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">End</label>
                      <input
                        type="month"
                        value={experience.duration.endYear}
                        onChange={(e) => updateField(index, "endYear", e.target.value)}
                        disabled={experience.current}
                        className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:outline-none 
                          ${experience.current ? "bg-gray-100" : "border-gray-300"}`}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      id={`isPresent-${index}`}
                      checked={experience.current}
                      onChange={(e) => {
                        updateField(index, "current", e.target.checked);
                      }}
                      className="rounded accent-blue-300"
                    />
                    <label htmlFor={`isPresent-${index}`} className="text-sm text-gray-600">
                      Currently working
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Responsibilities</label>
                  {experience.responsibilities.map((responsibility, responsibilityIndex) => (
                    <div key={responsibilityIndex} className="flex items-center gap-2 w-full">
                      <div className="flex-1">
                        <InputField
                          type="text"
                          name="responsibility"
                          value={responsibility}
                          onChange={(e) =>
                            updateResponsibility(index, responsibilityIndex, e.target.value)
                          }
                          placeholder="Add responsibility"
                          className="w-full"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeResponsibility(index, responsibilityIndex)}
                        className="text-red-500 hover:text-red-600 flex-shrink-0"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addResponsibility(index)}
                    className="text-sm text-blue-500 hover:text-blue-600"
                  >
                    + Add Responsibility
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addExperience}
            className="w-full p-2 text-blue-500 hover:text-blue-600 border-2 border-dashed border-blue-200 rounded-lg transition-colors duration-200 hover:border-blue-300"
          >
            + Add Experience
          </button>
        </div>
      )}
    </div>
  );
}
