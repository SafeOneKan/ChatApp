import ReactSwitch from "react-switch";
import { useTheme } from "../Context/ThemeContext";
import { useState } from "react";
import { UserAuth } from "../Context/AuthContext";
const Settings = () => {
  const { toggleTheme, isDarkTheme } = useTheme();
  const [logoutpannel, setLogout] = useState(false);
  const context = UserAuth();
  return (
    <>
      <div className="settings">
        <span>Settings</span>
        <div className="const">
          <div className="mode">
            {isDarkTheme ? "Dark Mode" : "Light Mode"}
            <ReactSwitch onChange={toggleTheme} checked={isDarkTheme} />
          </div>
          <button onClick={() => setLogout((prev) => !prev)}>LogOut</button>
        </div>
      </div>
      {logoutpannel && (
        <div className="logoutconf">
          <div className="conf">
            <p>do u want to log out</p>
            <div>
              <button onClick={() => context.LogOut()}>Yes</button>
              <button onClick={() => setLogout(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
