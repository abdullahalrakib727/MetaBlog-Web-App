import { useEffect, useState } from "react";

const ThemeSwitch = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);


useEffect(() => {
  localStorage.setItem('theme', theme);
  const localTheme = localStorage.getItem('theme');
  document.documentElement.classList.add(localTheme)

}, [theme]);

  const handleSwitch = () => {
    setTheme(theme == "dark" ? "light" : "dark");
  };


  return (
    <button
      className="bg-yellow-500 dark:bg-blue-500 px-2 py-1"
      onClick={handleSwitch}
    >
      Switch theme
    </button>
  );
};

export default ThemeSwitch;
