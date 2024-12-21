import { useState } from "react";
import CustomColorPicker from "./CustomColorPicker";

const templates = [
  {
    id: "professional",
    name: "Professional CV",
  },
  {
    id: "modern",
    name: "Modern Resume",
  },
  {
    id: "creative",
    name: "Creative Resume",
  },
];

export default function TemplateSelector({
  selectedTemplate,
  selectedColor,
  onTemplateChange,
  onColorChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate);

  return (
    <div className="border rounded-lg mb-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <button
        className={`w-full p-4 text-left font-medium flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 ${
          isOpen ? "bg-gray-100/70 hover:bg-gray-100/70" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Template Style</span>
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
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Template</label>
            <select
              value={selectedTemplate}
              onChange={(e) => onTemplateChange(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:outline-none border-gray-300"
            >
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">{selectedTemplateData?.description}</p>
          </div>

          {(selectedTemplate === "modern" || selectedTemplate === "creative") && (
            <CustomColorPicker
              selectedTemplate={selectedTemplate}
              onColorChange={onColorChange}
              initialColor={selectedColor}
            />
          )}
        </div>
      </div>
    </div>
  );
}
