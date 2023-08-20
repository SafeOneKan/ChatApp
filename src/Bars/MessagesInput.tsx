/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import { useChatsContext } from "../Context/ChatsContext";
import { UserAuth } from "../Context/AuthContext";

interface msgInpProps {
  onSend?: () => any;
}

const MessagesInput: FC<msgInpProps> = () => {
  const [Txt, setTxt] = useState("");

  const chatContext = useChatsContext();
  const AuthContext = UserAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSend = async (e: any) => {
    e.preventDefault();
    if (Txt) {
      if (AuthContext) {
        // Call the Firestore update function
        chatContext?.convomanager.updateConvo(
          chatContext.selectedConvoId,
          AuthContext.user?.uid || "unknown",
          Txt
        );

        // Reset text input
        setTxt("");

        // Toggle the toggleSend state (if needed)
      }
    }
  };

  return (
    <div className="typing">
      <form onSubmit={handleSend}>
        <input
          type="text"
          name="msg"
          id="msg"
          placeholder="Type here...."
          value={Txt}
          onChange={(e) => setTxt(e.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
};

export default MessagesInput;
