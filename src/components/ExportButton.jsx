import { useState } from "react";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ExportButton({ cvRef }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleExport = async () => {
    if (!cvRef.current) return;

    setIsLoading(true);
    try {
      const originalScale = cvRef.current.style.transform;
      cvRef.current.style.transform = "scale(1)";

      const canvas = await html2canvas(cvRef.current, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        removeContainer: true,
      });

      cvRef.current.style.transform = originalScale;

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
      pdf.save("my-cv.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isLoading}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-md 
        bg-blue-600 text-white font-medium text-xs
        hover:bg-blue-700 transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      <Download size={15} />
      {isLoading ? "Exporting..." : "Export PDF"}
    </button>
  );
}
