import { useState } from "react";
import SideBar from "../../Bars/SideBar";
import ChatsBar from "../../Bars/ChatsBar";
import Options from "../../Bars/Options";
import { useChatsContext } from "../../Context/ChatsContext";
import { UserAuth } from "../../Context/AuthContext";
import { useTheme } from "../../Context/ThemeContext";

function Test() {
  const [selectedop, setSelectedop] = useState<string>("messages");
  const handleSelected = (option: string) => {
    setSelectedop(option);
  };
  const ChatContext = useChatsContext();
  const AuthContext = UserAuth();
  const { isDarkTheme } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        zIndex: "0",
      }}
    >
      <Options isDarkTheme={isDarkTheme} OnselectOption={handleSelected} />
      <SideBar isDarkTheme={isDarkTheme} selected={selectedop} />
      <ChatsBar
        isDarkTheme={isDarkTheme}
        userId={AuthContext?.user?.uid || ""}
        selectedConvoId={ChatContext?.selectedConvoId || ""}
      />
    </div>
  );
}

export default Test;
