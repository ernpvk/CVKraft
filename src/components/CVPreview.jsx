import { memo } from "react";
import { getLinkIcon } from "../utils/GetLinkIcon";
import convertDate from "../utils/convertDate";

export const CVPreview = memo(function CVPreview({ personalData, educationData }) {
  // if (!personalData) {
  //   return (
  //     <div className="h-full flex items-center justify-center text-gray-500">
  //       Start filling out your information to see the preview
  //     </div>
  //   );
  // }

  const { firstName, lastName, email, phone, links } = personalData;
  const { institution, degree, fieldOfStudy, location, duration, current } = educationData;

  let endYear = current ? "Present" : convertDate(duration.endYear);

  return (
    <div className="h-full bg-white p-8 overflow-y-auto">
      {/* Header with Name */}
      <div className="border-b pb-6 mb-6 border-gray-400 ">
        <h1 className="text-3xl font-bold mb-2 text-center">
          {firstName} {lastName}
        </h1>

        {/* Contact Information */}
        <div className="flex flex-wrap text-xs text-gray-600 gap-2 justify-center items-center">
          <a
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline flex items-center gap-2"
          >
            {email && <span>{email}</span>}
          </a>
          {phone && <span>| {phone} |</span>}

          {/* Links */}
          {links?.map((link, index) => {
            if (!link.url) return null;

            return (
              <div key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>{getLinkIcon(link.url)}</span>
                  <span>{link.name || link.url}</span>
                  <span className="text-gray-600">|</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
      {/* Education */}
      <div>
        {(educationData?.institution || educationData?.degree || educationData?.fieldOfStudy) && (
          <h1 className="text-md font-bold mb-2 border-b border-gray-400">Education</h1>
        )}
        <div>
          <span className="text-xs font-bold mb-1 flex justify-between">
            <span>
              {" "}
              {institution}
              {location.city && `, ${location.city}`}
            </span>
            <span>
              {duration.startYear && convertDate(duration.startYear)} - {endYear}
            </span>
          </span>
          <div className="text-xs mb-2">
            {degree} {fieldOfStudy}
          </div>
        </div>
      </div>
    </div>
  );
});
