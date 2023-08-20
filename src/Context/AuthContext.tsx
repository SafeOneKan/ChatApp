import { useContext, createContext, FC, useEffect, useState } from "react";
import { Auth, db } from "..//Configs/firebase-config";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { collection, getDocs, query, where } from "firebase/firestore";
import {
  ProviderProps,
  UserProps,
  conValueProps,
} from "../Interfaces/Intreface";

const AuthCon = createContext<conValueProps>({} as conValueProps);

export const ConProvider: FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<conValueProps["user"]>(null);
  const [Users, setUsers] = useState<conValueProps["Users"]>([]);
  const [isLoading, setIsLoading] = useState(true);
  //Create A user

  const createUser = async (email: string, password: string) => {
    try {
      const cred = await createUserWithEmailAndPassword(Auth, email, password);
      return cred;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const logUser = (email: string, password: string) => {
    return signInWithEmailAndPassword(Auth, email, password);
  };

  useEffect(() => {
    onAuthStateChanged(Auth, (currentUser) => {
      if (currentUser) {
        const toadd: UserProps = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        };

        setUser(toadd);
        setIsLoading(false);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    const initialiseUsers = async () => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "!=", user?.uid));
      const docs = await getDocs(q);
      setUsers(
        docs.docs.map((doc) => {
          return {
            uid: doc.data().uid,
            email: doc.data().email,
            displayName: doc.data().displayName,
            photoURL: doc.data().photoURL,
          };
        })
      );
    };
    if (!isLoading && user) {
      initialiseUsers();
    }
  }, [user, isLoading]);

  const provider = new GoogleAuthProvider();

  const SignInGoogle = () => {
    return signInWithPopup(Auth, provider);
  };

  const LogOut = () => {
    signOut(Auth);
    setUser(null);
    setUsers([]);
  };

  const contextVal: conValueProps = {
    SignInGoogle,
    LogOut,
    user,
    createUser,
    logUser,
    Users,
    isLoading,
  };

  return <AuthCon.Provider value={contextVal}>{children}</AuthCon.Provider>;
};

export const UserAuth = () => {
  return useContext(AuthCon);
};
