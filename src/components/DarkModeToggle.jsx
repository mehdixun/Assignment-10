import { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(
    () => localStorage.theme === "dark" || document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="btn btn-sm btn-primary"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
