import { useNavigate } from "react-router-dom";

export default function Template() {
  const navigate = useNavigate();

  const templates = [
    {
      id: 1,
      name: "Professional",
      description: "Clean and modern design for corporate roles",
      thumbnail: "/api/placeholder/280/400",
    },
    {
      id: 2,
      name: "Creative",
      description: "Stand out with this dynamic layout",
      thumbnail: "/api/placeholder/280/400",
    },
    {
      id: 3,
      name: "Minimal",
      description: "Simple and elegant design",
      thumbnail: "/api/placeholder/280/400",
    },
  ];

  const handleTemplateSelect = (templateId) => {
    navigate(`/builder/`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Choose Your Template</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-100"
            >
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-[400px] object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <button
                  onClick={() => handleTemplateSelect(template.id)}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
