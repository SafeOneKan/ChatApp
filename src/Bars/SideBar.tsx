import { FC } from "react";
import "../static/Bars_css/sidebar.scss";
import Chats from "./Chats-pannel";
import Settings from "./Settings";

interface selecteprops {
  selected: string;
  isDarkTheme: boolean;
}

const SideBar: FC<selecteprops> = ({ isDarkTheme, selected }) => {
  return (
    <div className={`sidebar ${isDarkTheme ? "dark" : "light"}`}>
      {selected === "messages" && <Chats />}
      {selected === "settings" && <Settings />}
    </div>
  );
};

export default SideBar;
