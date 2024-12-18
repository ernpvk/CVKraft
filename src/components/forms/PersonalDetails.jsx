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
        className="w-full p-4 text-left font-medium flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Personal Details</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
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
                <div className="flex gap-4 items-start">
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
                      <div className="flex gap-2 mt-2 text-gray-500">
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
      )}
    </div>
  );
}
