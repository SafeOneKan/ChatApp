import React, { ReactNode } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "./Configs/firebase-config";
import { collection } from "firebase/firestore";

interface ConvoChildrenProps {
  path: string;
  children?: ReactNode;
}

const ChildrenList: React.FC<ConvoChildrenProps> = (props) => {
  const ConvoCollec = collection(db, props.path);
  const [docs, isLoading] = useCollectionData(ConvoCollec);

  return (
    <ul>
      {isLoading && <div>Loading...</div>}
      {docs?.map((doc) => (
        <li key={doc?.id}>
          {doc?.name}
          {props.children && props.children}
        </li>
      ))}
    </ul>
  );
};

export default ChildrenList;
