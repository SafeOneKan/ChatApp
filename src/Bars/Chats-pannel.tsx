/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Avatar } from "@mui/material";
import { UserAuth } from "../Context/AuthContext";
import { useChatsContext } from "../Context/ChatsContext";
import { participant } from "../Interfaces/Intreface"; // Update the import path

const Chats: React.FC = () => {
  const [msgspannel, setMsgspannel] = useState<any[]>([]);
  const Authcontext = UserAuth();
  const ChatContext = useChatsContext();

  useEffect(() => {
    const fetchAndConvertConvos = async () => {
      if (Authcontext?.user && ChatContext) {
        const convos = await ChatContext.convomanager.ConvertConvosDocs(
          ChatContext?.userConvos,
          Authcontext?.user?.uid
        );
        ChatContext?.setConvosArray(convos);

        if (Authcontext.user) {
          setMsgspannel(
            convos.map((item) => {
              const t = item.participants.filter(
                (con: any) => con.id != Authcontext.user?.uid
              )[0];
              return {
                id: item.id,
                participant: t,
              };
            })
          );
        }
      }
    };

    fetchAndConvertConvos();
  }, [Authcontext.user, ChatContext, ChatContext?.userConvos]);

  useEffect(() => {
    ChatContext?.setSelectedConvoData(
      ChatContext?.convosArray.filter(
        (convo) => convo.id === ChatContext.selectedConvoId
      )[0]
    );
  }, [ChatContext.selectedConvoId, ChatContext?.convosArray, ChatContext]);

  useEffect(() => {
    if (ChatContext?.selectedConvoId) {
      ChatContext?.setMsgs(ChatContext.selectedConvoData.messages);
      console.log(ChatContext.selectedConvoData, ChatContext.msgs);
    }
  }, [ChatContext, ChatContext.selectedConvoData]);
  const handleInputChange = (e: any, value: string) => {
    console.log(e);
    const selected = Authcontext?.Users.find(
      (user) => user.displayName === value
    );
    ChatContext?.setSelectedUser(selected || null);
  };

  const handleSelect = async () => {
    if (Authcontext?.user && ChatContext?.selectedUser) {
      const participants: participant[] = [
        {
          uid: Authcontext.user.uid,
          displayName: Authcontext.user.displayName,
          email: Authcontext.user.email,

          photoURL: Authcontext.user.photoURL,
        },
        {
          uid: ChatContext.selectedUser.uid,
          displayName: ChatContext.selectedUser.displayName,
          email: ChatContext.selectedUser.email,

          photoURL: ChatContext.selectedUser.photoURL,
        },
      ];
      await ChatContext?.convomanager.createConvo(participants);
      ChatContext?.setSelectedUser(null);
    }
  };

  const handleConvoSelect = (uid: string | null = null) => {
    ChatContext?.setSelectedConvoId(uid || "");
    ChatContext?.setSelectedConvoData(
      ChatContext?.convosArray.filter((convos) => convos.id === uid)[0]
    );
  };

  return (
    <div className="cont">
      <span>Chats</span>
      <div className="autocomplet">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={Authcontext?.Users || []}
          onInputChange={handleInputChange}
          onSelect={handleSelect}
          value={ChatContext?.selectedUser}
          getOptionLabel={(person) => `${person.displayName}`}
          renderInput={(params) => (
            <TextField {...params} label="Search for People" />
          )}
          renderOption={(props, user) => (
            <li style={{ display: "flex", gap: 10 }} {...props}>
              <Avatar src={user.photoURL || undefined} alt="img" />
              <span> {`${user.displayName}`} </span>
            </li>
          )}
          filterOptions={(options, state) => {
            const inputValue = state.inputValue.toLowerCase();
            return options.filter(
              (person) =>
                person.displayName?.toLowerCase().includes(inputValue) ||
                person.email?.toLowerCase().includes(inputValue)
            );
          }}
        />
      </div>
      {Authcontext.user && ChatContext && msgspannel.length > 0 && (
        <ul className="convo-list-cont">
          {msgspannel.map((convo) => (
            <li
              onClick={() => {
                handleConvoSelect(convo.id);
              }}
              className={`convo-list ${
                ChatContext?.selectedConvoId === convo.id ? "selected" : ""
              }`}
              key={convo.id}
            >
              <Avatar src={convo?.participant?.photoURL || undefined} />
              <div className="info">
                <div className="name">{convo?.participant?.displayName}</div>
                <div className="lastmsg">
                  {convo?.participant?.latest_message}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Chats;
