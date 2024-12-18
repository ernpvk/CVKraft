import { useState } from "react";
import InputField from "./InputField";

export default function Education({ data, onChange }) {
  const [isOpen, setIsOpen] = useState(true);

  const addEducation = () => {
    onChange([
      ...data,
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
  };

  const removeEducation = (index) => {
    const updatedEducation = data.filter((_, i) => i !== index);
    onChange(updatedEducation);
  };

  const updateField = (index, name, value) => {
    const updatedEducation = [...data];

    if (name === "city" || name === "country") {
      updatedEducation[index] = {
        ...updatedEducation[index],
        location: {
          ...updatedEducation[index].location,
          [name]: value,
        },
      };
    } else if (name === "startYear" || name === "endYear") {
      updatedEducation[index] = {
        ...updatedEducation[index],
        duration: {
          ...updatedEducation[index].duration,
          [name]: value,
        },
      };
    } else {
      updatedEducation[index] = {
        ...updatedEducation[index],
        [name]: value,
      };
    }
    onChange(updatedEducation);
  };

  return (
    <div className="border rounded-lg mb-4">
      <button
        className="w-full p-4 text-left font-medium flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Education</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="p-4 space-y-4">
          {data.map((education, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Education #{index + 1}</h3>
                {data.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Institution"
                    name="institution"
                    value={education.institution}
                    onChange={(e) => updateField(index, e.target.name, e.target.value)}
                    required
                  />
                  <InputField
                    label="Degree(s)"
                    name="degree"
                    value={education.degree}
                    onChange={(e) => updateField(index, e.target.name, e.target.value)}
                    required
                  />
                </div>

                <div>
                  <InputField
                    label="Field of Study"
                    name="fieldOfStudy"
                    value={education.fieldOfStudy}
                    onChange={(e) => updateField(index, e.target.name, e.target.value)}
                    type="text"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="City"
                    name="city"
                    value={education.location.city}
                    onChange={(e) => updateField(index, e.target.name, e.target.value)}
                  />
                  <InputField
                    label="Country"
                    name="country"
                    value={education.location.country}
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
                        value={education.duration.startYear}
                        onChange={(e) => updateField(index, "startYear", e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:outline-none border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">End</label>
                      <input
                        type="month"
                        value={education.duration.endYear}
                        onChange={(e) => updateField(index, "endYear", e.target.value)}
                        disabled={education.current}
                        className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:outline-none 
                          ${education.current ? "bg-gray-100" : "border-gray-300"}`}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      id={`isPresent-${index}`}
                      checked={education.current}
                      onChange={(e) => {
                        updateField(index, "current", e.target.checked);
                      }}
                      className="rounded accent-blue-300"
                    />
                    <label htmlFor={`isPresent-${index}`} className="text-sm text-gray-600">
                      Currently studying
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addEducation}
            className="w-full p-2 text-blue-500 hover:text-blue-600 border-2 border-dashed border-blue-200 rounded-lg transition-colors duration-200 hover:border-blue-300" 
          >
            + Add Another Education
          </button>
        </div>
      )}
    </div>
  );
}
