import { FC, useEffect, useRef } from "react";
import { DisplayProps } from "../Interfaces/Intreface";
import { useChatsContext } from "../Context/ChatsContext";

const DisplayMsgs: FC<DisplayProps> = ({ userId }) => {
  const chatsContext = useChatsContext();

  const reference = useRef<any>(null);

  useEffect(() => {
    reference.current?.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <div className="messages-pannel">
      {chatsContext?.msgs?.map((message) => (
        <div
          ref={reference}
          key={message.id}
          className={`${message.senderId === userId ? "user" : "other"}-msg`}
        >
          <div className="msg">{message.value}</div>
        </div>
      ))}
    </div>
  );
};

export default DisplayMsgs;

{
  /* <div className="user-msg">
  <div className="msg">hello</div>
</div>; */
}
