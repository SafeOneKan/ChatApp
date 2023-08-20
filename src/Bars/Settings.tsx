import ReactSwitch from "react-switch";
import { useTheme } from "../Context/ThemeContext";
const Settings = () => {
  const { toggleTheme, isDarkTheme } = useTheme();
  return (
    <div className="settings">
      <span>Settings</span>
      <div className="const">
        {isDarkTheme ? "Dark Mode" : "Light Mode"}
        <ReactSwitch onChange={toggleTheme} checked={isDarkTheme} />
      </div>
    </div>
  );
};

export default Settings;
