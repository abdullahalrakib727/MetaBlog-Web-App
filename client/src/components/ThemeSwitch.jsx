import { useEffect, useState } from "react";


const ThemeSwitch = () => {

  const [theme, settheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // return cleanUp = () => {

    // }
  }, [theme]);

  const handleSwitch = () => {
    settheme(theme == "dark" ? "light" : "dark");
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
