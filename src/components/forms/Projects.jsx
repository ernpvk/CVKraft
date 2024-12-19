import { useState } from "react";
import InputField from "./InputField";

export default function Project({ data, onChange }) {
  const [isOpen, setIsOpen] = useState(true);

  const addProject = () => {
    onChange([
      ...data,
      {
        projectTitle: "",
        role: "",
        date: "",
        responsibilities: [""],
      },
    ]);
  };

  const removeProject = (index) => {
    const updatedProject = data.filter((_, i) => i !== index);
    onChange(updatedProject);
  };

  const updateField = (index, name, value) => {
    const updatedProject = [...data];

    updatedProject[index] = {
      ...updatedProject[index],
      [name]: value,
    };

    onChange(updatedProject);
  };

  const addResponsibility = (projectIndex) => {
    const updatedProject = [...data];
    updatedProject[projectIndex] = {
      ...updatedProject[projectIndex],
      responsibilities: [...updatedProject[projectIndex].responsibilities, ""],
    };
    onChange(updatedProject);
  };

  const removeResponsibility = (projectIndex, responsibilityIndex) => {
    const updatedProject = [...data];
    updatedProject[projectIndex] = {
      ...updatedProject[projectIndex],
      responsibilities: updatedProject[projectIndex].responsibilities.filter(
        (_, i) => i !== responsibilityIndex
      ),
    };
    onChange(updatedProject);
  };

  const updateResponsibility = (projectIndex, responsibilityIndex, value) => {
    const updatedProject = [...data];
    const responsibilities = [...updatedProject[projectIndex].responsibilities];

    responsibilities[responsibilityIndex] = value;

    updatedProject[projectIndex] = {
      ...updatedProject[projectIndex],
      responsibilities: responsibilities,
    };

    onChange(updatedProject);
  };
  return (
    <div className="border rounded-lg mb-4">
      <button
        className="w-full p-4 text-left font-medium flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Project</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="p-4 space-y-4">
          {data.map((project, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Project #{index + 1}</h3>
                {data.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <InputField
                    label="Project Title"
                    name="projectTitle"
                    value={project.projectTitle}
                    onChange={(e) => updateField(index, e.target.name, e.target.value)}
                    required
                  />
                  <InputField
                    label="Role"
                    name="role"
                    value={project.role}
                    onChange={(e) => updateField(index, e.target.name, e.target.value)}
                    required
                  />
                </div>

                <div className="">
                  <label className="block text-sm font-medium mb-1">Date </label>
                  <input
                    type="month"
                    value={project.date}
                    onChange={(e) => updateField(index, "date", e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:outline-none border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Responsibilities</label>
                  {project.responsibilities.map((responsibility, responsibilityIndex) => (
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
            onClick={addProject}
            className="w-full p-2 text-blue-500 hover:text-blue-600 border-2 border-dashed border-blue-200 rounded-lg transition-colors duration-200 hover:border-blue-300"
          >
            + Add Project
          </button>
        </div>
      )}
    </div>
  );
}
