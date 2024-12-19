import { useState } from "react";
import { getLinkIcon } from "../../utils/GetLinkIcon";
import InputField from "./InputField";

const validateField = (name, value) => {
  switch (name) {
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email";
    case "phone":
      return /^\+?[\d\s-]{10,}$/.test(value) ? "" : "Invalid phone number";
    case "firstName":
      return value.length > 0 ? "" : "First name required";
    case "lastName":
      return value.length > 0 ? "" : "Last name required";
    default:
      return "";
  }
};

const validateLink = (url) => {
  if (!url) return "";
  try {
    new URL(url);
    return "";
  } catch {
    return "Invalid URL";
  }
};

export default function PersonalDetails({ data, onChange }) {
  const [isOpen, setIsOpen] = useState(true);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const updateField = (name, value) => {
    onChange({
      ...data,
      [name]: value,
    });

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const addLink = () => {
    onChange({
      ...data,
      links: [...(data.links || []), { name: "", url: "" }],
    });
  };

  const removeLink = (index) => {
    const newLinks = data.links.filter((_, i) => i !== index);
    onChange({
      ...data,
      links: newLinks,
    });
  };

  const updateLink = (index, field, value) => {
    const newLinks = data.links.map((link, i) => {
      if (i === index) {
        return { ...link, [field]: value };
      }
      return link;
    });
    onChange({
      ...data,
      links: newLinks,
    });
  };

  return (
    <div className="border rounded-lg mb-4">
      <button
        className={`w-full p-4 text-left font-medium flex justify-between items-center hover:bg-blue-50 transition-colors duration-200 ${
          isOpen ? "bg-blue-100 hover:bg-blue-100" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Personal Detail</span>
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
        <div className="transition p-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField
              label="First Name"
              name="firstName"
              value={data.firstName}
              onChange={(e) => updateField(e.target.name, e.target.value)}
              onBlur={handleBlur}
              required
              error={errors.firstName}
              touched={touched.firstName}
            />
            <InputField
              label="Last Name"
              name="lastName"
              value={data.lastName}
              onChange={(e) => updateField(e.target.name, e.target.value)}
              onBlur={handleBlur}
              required
              error={errors.lastName}
              touched={touched.lastName}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Email"
              name="email"
              type="email"
              value={data.email}
              onChange={(e) => updateField(e.target.name, e.target.value)}
              onBlur={handleBlur}
              required
              error={errors.email}
              touched={touched.email}
            />
            <InputField
              label="Phone"
              name="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => updateField(e.target.name, e.target.value)}
              onBlur={handleBlur}
              error={errors.phone}
              touched={touched.phone}
            />
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="block text-sm font-medium">Links</label>
              <button
                type="button"
                onClick={addLink}
                className="text-blue-500 hover:text-blue-600 text-sm"
              >
                + Add Link
              </button>
            </div>
            {data.links?.map((link, index) => (
              <div key={index}>
                <div
                  className="flex gap-4 items-start  p-3 transform transition-all duration-300 animate-fade-in"
                  style={{
                    animation: "fadeIn 0.3s ease-in-out",
                  }}
                >
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Link Name"
                      value={link.name}
                      onChange={(e) => updateLink(index, "name", e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:outline-none mb-2 border-gray-300"
                    />
                    <input
                      type="url"
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) => updateLink(index, "url", e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 focus:outline-none mb-2 border-gray-300"
                    />
                    {link.url && validateLink(link.url) === "" && (
                      <div className="flex gap-2 mt-2 text-gray-500 items-center">
                        {getLinkIcon(link.url)}
                        <span className="text-sm">{link.url}</span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLink(index)}
                    className="text-red-500 hover:text-red-600 mt-2 text-lg"
                  >
                    ×
                  </button>
                </div>
                {index < data.links.length - 1 && (
                  <div className="border-t border-gray-300 my-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
