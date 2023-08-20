import { FC } from "react";
import "../static/Bars_css/optionsbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faGear,
  faHurricane,
} from "@fortawesome/free-solid-svg-icons";
import { UserAuth } from "../Context/AuthContext";

import { useTheme } from "../Context/ThemeContext";
import { Avatar } from "@mui/material";

interface props {
  OnselectOption: (option: string) => void;
  isDarkTheme: boolean;
}

const Options: FC<props> = ({ isDarkTheme, OnselectOption }) => {
  const context = UserAuth();
  const { toggleTheme } = useTheme();

  return (
    <div className={`optionsbar ${isDarkTheme ? "dark" : "light"}`}>
      <div className="section">
        <button onClick={() => OnselectOption("messages")}>
          <FontAwesomeIcon className="op-ico" icon={faComments} />
        </button>
        <button onClick={toggleTheme}>
          <FontAwesomeIcon className="op-ico" icon={faHurricane} />
        </button>
      </div>
      <div className="section">
        <button onClick={() => OnselectOption("settings")}>
          <FontAwesomeIcon className="op-ico" icon={faGear} />
        </button>
        <button>
          <Avatar
            className="profil-pic"
            src={context?.user?.photoURL ? context.user.photoURL : undefined}
          />
        </button>
      </div>
    </div>
  );
};

export default Options;
