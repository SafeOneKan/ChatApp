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

import {
  ProviderProps,
  UserProps,
  conValueProps,
} from "../Interfaces/Intreface";
import { collection, getDocs, query, where } from "firebase/firestore";

const AuthCon = createContext<conValueProps>({} as conValueProps);

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

const provider = new GoogleAuthProvider();

const SignInGoogle = () => {
  return signInWithPopup(Auth, provider);
};

export const ConProvider: FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<conValueProps["user"]>(null);
  const [Users, setUsers] = useState<conValueProps["Users"]>([]);
  const [isMobile, setIsMobile] = useState(false);

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
      } else {
        setUser(null);
      }
    });
    if (window.innerWidth <= 500) setIsMobile(true);
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
    if (user) {
      initialiseUsers();
    }
  }, [user]);
  //Create A user
  const LogOut = () => {
    signOut(Auth);
    setUser(null);
  };

  const contextVal: conValueProps = {
    SignInGoogle,
    LogOut,
    user,
    createUser,
    logUser,
    Users,
    isMobile,
  };

  return <AuthCon.Provider value={contextVal}>{children}</AuthCon.Provider>;
};

export const UserAuth = () => {
  return useContext(AuthCon);
};
