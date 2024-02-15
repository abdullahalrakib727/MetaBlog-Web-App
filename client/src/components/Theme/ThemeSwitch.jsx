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

  const handleSwitch = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <input
      onChange={handleSwitch}
      type="checkbox"
      className="toggle bg-[#E8E8EA] border-[#E8E8EA]"
      checked={theme === "dark"}
    />
  );
};

export default ThemeSwitch;
