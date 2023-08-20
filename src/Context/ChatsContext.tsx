/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, createContext, useContext, useEffect, useState } from "react";
import {
  ChatsContextProps,
  ProviderProps,
  UserProps,
  MessagesProps,
} from "../Interfaces/Intreface";
import { UserAuth } from "./AuthContext";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Configs/firebase-config";
import { Convosmanager } from "../ConvosManager";

const ChatContext = createContext<ChatsContextProps>({} as ChatsContextProps);

export const ChatsContext: FC<ProviderProps> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);
  const [userConvos, setUserConvos] = useState<any[]>([]);
  const [selectedConvoId, setSelectedConvoId] = useState<string>("");
  const context = UserAuth();
  const [selectedConvoData, setSelectedConvoData] = useState<any[]>([]);
  const [convosArray, setConvosArray] = useState<any[]>([]);
  const [msgs, setMsgs] = useState<MessagesProps[]>([]);
  const convomanager = new Convosmanager();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "conversations"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "modified") {
          setUserConvos((prev) =>
            prev.map((doc) => {
              if (doc.id === change.doc.id) {
                return change.doc;
              }
              return doc;
            })
          );
        } else if (change.type === "added") {
          const userUid = context?.user?.uid;
          if (userUid && change.doc.id.includes(userUid)) {
            setUserConvos((prev) => {
              if (!(change.doc.id in prev.map((doc) => doc.id))) {
                return [...prev, change.doc];
              }
              return prev;
            });
          }
        }
      });
    });
    return () => {
      unsub();
      // Clean up the listener when the component unmounts
    };
  }, [context.user]);

  // useEffect(() => {
  //   const renderconvos = async () => {
  //     if (context?.user) {
  //       const st = await convomanager.getUserConvos(context.user.uid);
  //       setUserConvos(st);
  //     } else {
  //       setUserConvos([]);
  //     }
  //   };
  //   if (!context?.isLoading && context?.user) {
  //     renderconvos();
  //   }
  // }, [context?.isLoading, context?.user, selectedUser]);

  // useEffect(() => {
  //   const unsubscribeFns: (() => void)[] = [];

  //   userConvos.forEach((convoDoc) => {
  //     const unsubscribe = onSnapshot(convoDoc.ref, (snapshot: any) => {
  //       setUserConvos(snapshot.data());
  //     });

  //     unsubscribeFns.push(unsubscribe);
  //   });

  //   return () => {
  //     unsubscribeFns.forEach((unsubscribe) => unsubscribe());
  //   };
  // }, [userConvos]);

  const ProviderValue: ChatsContextProps = {
    userConvos,
    setUserConvos,
    selectedUser,
    setSelectedUser,
    convomanager,
    selectedConvoData,
    setSelectedConvoData,
    selectedConvoId,
    setSelectedConvoId,
    convosArray,
    setConvosArray,
    msgs,
    setMsgs,
  };

  return (
    <ChatContext.Provider value={ProviderValue}>
      {children}
    </ChatContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChatsContext = () => {
  return useContext(ChatContext);
};

export default ChatsContext;
