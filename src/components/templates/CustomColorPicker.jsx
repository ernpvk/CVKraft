import { useState, useEffect } from "react";

const CustomColorPicker = ({ selectedTemplate, onColorChange, initialColor = "#4477CE" }) => {
  const [color, setColor] = useState(initialColor);

  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    onColorChange(newColor);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {selectedTemplate === "modern" ? "Accent Color" : "Background Color"}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="w-12 h-12 p-1 rounded cursor-pointer border border-gray-200"
          title="Choose color"
        />
        <div className="text-sm text-gray-600">{color.toUpperCase()}</div>
      </div>
    </div>
  );
};

export default CustomColorPicker;
