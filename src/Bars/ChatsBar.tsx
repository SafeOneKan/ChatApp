import { FC, useEffect, useState } from "react";
import "../static/Bars_css/chatsbar.scss";
import { chatbarprop, participant } from "../Interfaces/Intreface";
import { useChatsContext } from "../Context/ChatsContext";
import MessagesInput from "./MessagesInput";
import Noconvo from "./Noconvo";
import DisplayMsgs from "./DisplayMsgs";

const ChatsBar: FC<chatbarprop> = ({
  isDarkTheme,
  userId,
  selectedConvoId,
}) => {
  const [other, setOther] = useState<participant | null>(null);
  const chatsContext = useChatsContext();
  useEffect(() => {
    if (chatsContext?.selectedConvoId) {
      const ss = chatsContext?.selectedConvoData.participants.filter(
        (e: any) => e.uid !== userId
      )[0];

      setOther(ss);
    }
  }, [selectedConvoId]);

  return (
    <div className={`chatsbar ${isDarkTheme ? "dark" : "light"}`}>
      {chatsContext?.selectedConvoId ? (
        <>
          <div className="header">
            <div className="displayName">{other?.displayName}</div>
          </div>
          <DisplayMsgs userId={userId} messages={[]} />
          <MessagesInput />
        </>
      ) : (
        <Noconvo />
      )}
    </div>
  );
};

export default ChatsBar;
