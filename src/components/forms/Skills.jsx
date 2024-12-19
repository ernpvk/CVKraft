import { useState } from "react";
import InputField from "./InputField";

export default function Skill({ data, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const addSkill = () => {
    onChange([
      ...data,
      {
        category: "",
        skill: "",
      },
    ]);
  };

  const removeSkill = (index) => {
    const updatedSkill = data.filter((_, i) => i !== index);
    onChange(updatedSkill);
  };

  const updateField = (index, name, value) => {
    const updatedSkill = [...data];

    updatedSkill[index] = {
      ...updatedSkill[index],
      [name]: value,
    };

    onChange(updatedSkill);
  };

  return (
    <div className="border rounded-lg mb-4">
      <button
        className={`w-full p-4 text-left font-medium flex justify-between items-center hover:bg-blue-50 transition-colors duration-200 ${
          isOpen ? "bg-blue-100 hover:bg-blue-100" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Skill</span>
        <span
          className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-down"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 space-y-4">
          {data.map((skill, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 transform transition-all duration-300 animate-fade-in"
              style={{
                animation: "fadeIn 0.3s ease-in-out",
              }}
            >
              <div className="flex justify-between items-center mb-4">
                {skill.category ? (
                  <h3 className="font-medium">{skill.category}</h3>
                ) : (
                  <h3 className="font-medium">Category</h3>
                )}
                {data.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <InputField
                    label="Category Name"
                    name="category"
                    value={skill.category}
                    onChange={(e) => updateField(index, e.target.name, e.target.value)}
                    required
                  />
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Skill</label>
                    <input
                      type="text"
                      value={skill.skill}
                      onChange={(e) => updateField(index, "skill", e.target.value)}
                      className={
                        "w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:outline-none border-gray-300"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addSkill}
            className="w-full p-2 text-blue-500 hover:text-blue-600 border-2 border-dashed border-blue-200 rounded-lg transition-colors duration-200 hover:border-blue-300"
          >
            + Add Skill
          </button>
        </div>
      </div>
    </div>
  );
}
