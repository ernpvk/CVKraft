const convertDate = (dateString) => {
  if (!dateString || !/^\d{4}-\d{2}$/.test(dateString)) {
    throw new Error("Invalid date format. Expected 'YYYY-MM'");
  }

  const [year, month] = dateString.split("-").map(Number);

  const date = new Date(year, month - 1);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  return formattedDate;
};

export default convertDate;
