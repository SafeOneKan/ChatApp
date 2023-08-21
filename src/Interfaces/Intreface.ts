/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserCredential } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { Convosmanager } from "../ConvosManager";

export interface themeProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

export interface UserProps {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface participant extends UserProps {
  latest_message?: string;
}

export interface ConvoProps {
  id: string;
  participants: participant[];
}

export interface ProviderProps {
  children: React.ReactNode;
}

export interface conValueProps {
  SignInGoogle: () => Promise<UserCredential>;
  LogOut: () => void;
  createUser: (
    email: string,
    password: string
  ) => Promise<UserCredential | null>;
  user: UserProps | null;
  logUser: (email: string, password: string) => Promise<UserCredential>;
  Users: UserProps[];
  isMobile: boolean;
}

export interface ChatsContextProps {
  selectedUser: UserProps | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  userConvos: ConvoProps[];
  setUserConvos: React.Dispatch<React.SetStateAction<ConvoProps[]>>;
  convomanager: Convosmanager;
  selectedConvoData: any;
  setSelectedConvoData: React.Dispatch<React.SetStateAction<any>>;
  selectedConvoId: string;
  setSelectedConvoId: React.Dispatch<React.SetStateAction<string>>;
  convosArray: any[];
  setConvosArray: React.Dispatch<React.SetStateAction<any[]>>;
  msgs: MessagesProps[];
  setMsgs: React.Dispatch<React.SetStateAction<MessagesProps[]>>;
}

export interface MessagesProps {
  id: string;
  Date: Timestamp;
  senderId: string;
  value: any;
}

export interface DisplayProps {
  messages: MessagesProps[];
  userId: string;
}

export interface chatbarprop {
  userId: string;
  selectedConvoId: string;
  isDarkTheme: boolean;
}
