export const getLinkIcon = (url) => {
  const commonStyle = "w-3.5 h-3.5";

  if (url.includes("linkedin.com"))
    return (
      <img
        src="https://cdn.simpleicons.org/linkedin/4f4f4f"
        alt="LinkedIn"
        className={commonStyle}
      />
    );
  if (url.includes("github.com"))
    return (
      <img src="https://cdn.simpleicons.org/github/4f4f4f" alt="GitHub" className={commonStyle} />
    );
  if (url.includes("twitter.com"))
    return <img src="https://cdn.simpleicons.org/x/4f4f4f" alt="Twitter" className={commonStyle} />;
  if (url.includes("instagram.com"))
    return (
      <img
        src="https://cdn.simpleicons.org/instagram/4f4f4f"
        alt="Instagram"
        className={commonStyle}
      />
    );
  if (url.includes("facebook.com"))
    return (
      <img
        src="https://cdn.simpleicons.org/facebook/4f4f4f"
        alt="Facebook"
        className={commonStyle}
      />
    );
  if (url.includes("medium.com"))
    return (
      <img src="https://cdn.simpleicons.org/medium/4f4f4f" alt="Medium" className={commonStyle} />
    );

  return (
    <img
      src="https://cdn.simpleicons.org/internetexplorer/4f4f4f"
      alt="Website"
      className={commonStyle}
    />
  );
};
