import { useState } from "react";
import InputField from "./InputField";

export default function Education({ data, onChange }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPresent, setIsPresent] = useState(false);

  const updateField = (name, value) => {
    if (name === "city" || name === "country") {
      onChange({
        ...data,
        location: {
          ...data.location,
          [name]: value,
        },
      });
    } else if (name === "startYear" || name === "endYear") {
      onChange({
        ...data,
        duration: {
          ...data.duration,
          [name]: value,
        },
      });
    } else {
      onChange({
        ...data,
        [name]: value,
      });
    }
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
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Institution"
              name="institution"
              value={data.institution}
              onChange={(e) => updateField(e.target.name, e.target.value)}
              required
            />
            <InputField
              label="Degree(s)"
              name="degree"
              value={data.degree}
              onChange={(e) => updateField(e.target.name, e.target.value)}
              required
            />
          </div>
          <div>
            <InputField
              label="Field of Study"
              name="fieldOfStudy"
              value={data.fieldOfStudy}
              onChange={(e) => updateField(e.target.name, e.target.value)}
              type="text"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="City"
              name="city"
              value={data.location.city}
              onChange={(e) => updateField(e.target.name, e.target.value)}
            />
            <InputField
              label="Country"
              name="country"
              value={data.location.country}
              onChange={(e) => updateField(e.target.name, e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Duration</label>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">Start</label>
                <input
                  type="month"
                  value={data.duration.startYear}
                  onChange={(e) => updateField("startYear", e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:outline-none border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End</label>
                <input
                  type="month"
                  value={data.duration.endYear}
                  onChange={(e) => updateField("endYear", e.target.value)}
                  disabled={isPresent}
                  className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:outline-none 
                      ${isPresent ? "bg-gray-100" : "border-gray-300"}`}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="isPresent"
                checked={isPresent}
                onChange={(e) => {
                  setIsPresent(e.target.checked);
                  onChange({
                    ...data,
                    current: e.target.checked,
                  });
                }}
                className="rounded accent-blue-300"
              />
              <label className="text-sm text-gray-600">Currently studying</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
