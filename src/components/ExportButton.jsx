import { useState } from "react";
import { Download } from "lucide-react";
import html2pdf from "html2pdf.js";

export default function ExportButton({ cvRef }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = () => {
    if (!cvRef.current) return;
    setIsLoading(true);

    const opt = {
      filename: "my-cv.pdf",
      html2canvas: {
        scale: 4,
        useCORS: true,
        scrollY: 0,
        scrollX: 0,
        letterRendering: true,
        imageTimeout: 0,
        removeContainer: true,
        ignoreElements: (element) => {
          const style = window.getComputedStyle(element);
          return style.transform && style.transform.includes("scale");
        },
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        putOnlyUsedFonts: true,
        floatPrecision: "16",
        compress: true,
      },
      pagebreak: { mode: ["css", "avoid-all"] },
      margin: 0,
    };

    // Store original styles
    const originalHeight = cvRef.current.style.minHeight;
    const originalPosition = cvRef.current.style.position;

    // Temporarily adjust styles to prevent extra page
    cvRef.current.style.minHeight = "unset";
    cvRef.current.style.position = "relative";

    // Fix borders by adding explicit styles
    const sections = cvRef.current.querySelectorAll("h2");
    sections.forEach((section) => {
      section.style.marginBottom = "0rem";
      section.style.paddingBottom = "0.5rem";
    });

    // Fix list indentation and bullets
    const lists = cvRef.current.querySelectorAll("ul");
    lists.forEach((list) => {
      list.style.marginLeft = "1.5rem";
      list.style.listStyleType = "disc";
      list.style.listStylePosition = "outside";
    });

    // Fix list items spacing
    const listItems = cvRef.current.querySelectorAll("li");
    listItems.forEach((item) => {
      item.style.paddingLeft = "0.5rem";
    });

    // Fix icon images by preloading them
    const images = Array.from(cvRef.current.getElementsByTagName("img"));
    Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    ).then(() => {
      html2pdf()
        .from(cvRef.current)
        .set(opt)
        .save()
        .then(() => {
          // Restore original styles
          cvRef.current.style.minHeight = originalHeight;
          cvRef.current.style.position = originalPosition;
          sections.forEach((section) => {
            section.style.marginBottom = "";
            section.style.paddingBottom = "";
          });
          lists.forEach((list) => {
            list.style.marginLeft = "";
            list.style.listStyleType = "";
            list.style.listStylePosition = "";
          });
          listItems.forEach((item) => {
            item.style.marginBottom = "";
            item.style.paddingLeft = "";
          });
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
          // Restore original styles on error too
          cvRef.current.style.minHeight = originalHeight;
          cvRef.current.style.position = originalPosition;
          sections.forEach((section) => {
            section.style.marginBottom = "";
            section.style.paddingBottom = "";
          });
          lists.forEach((list) => {
            list.style.marginLeft = "";
            list.style.listStyleType = "";
            list.style.listStylePosition = "";
          });
          listItems.forEach((item) => {
            item.style.marginBottom = "";
            item.style.paddingLeft = "";
          });
          setIsLoading(false);
        });
    });
  };

  return (
    <button
      onClick={handleExport}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white font-medium
        hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Download size={20} />
      {isLoading ? "Exporting..." : "Export PDF"}
    </button>
  );
}
