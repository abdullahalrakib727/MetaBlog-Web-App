
import { FC } from "react";
import { useTheme } from "../../Providers/ThemeProvider";

const ThemeSwitch: FC = (): JSX.Element => {
  const { theme, setTheme } = useTheme();

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
