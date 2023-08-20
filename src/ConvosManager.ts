import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { participant } from "./Interfaces/Intreface";
import { db } from "./Configs/firebase-config";
import { v4 as autoid } from "uuid";
export class Convosmanager {
  ConversationsCollecRef = collection(db, "conversations");
  createConvo: (participants: participant[]) => Promise<true | false> = async (
    participants
  ) => {
    try {
      const conversationId = participants
        .map((partici) => partici.uid)
        .sort()
        .reverse()
        .join("-");

      const convoDoc = doc(this.ConversationsCollecRef, conversationId);
      const existingConvo = await getDoc(convoDoc);

      if (existingConvo.exists()) {
        return false;
      }

      await setDoc(convoDoc, { id: conversationId, messages: [] });
      const partsCollecRef = await collection(convoDoc, "participants");

      participants.forEach(async (participant) => {
        await setDoc(doc(partsCollecRef, participant.uid), {
          uid: participant.uid,
          displayName: participant.displayName,
          email: participant.email,
          latest_message: "",
          photoURL: participant.photoURL,
        });
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  getUserConvos: (userID: string) => Promise<any[]> = async (userID) => {
    try {
      const q = query(this.ConversationsCollecRef, where("id", ">=", userID));
      const convosdocs = (await getDocs(q)).docs.filter((doc) => {
        return doc.id.includes(userID);
      });
      console.log(convosdocs);
      return convosdocs;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      return [];
    }
  };

  ConvertConvosDocs: (
    convosdocs: any[],
    activeuserID: string
  ) => Promise<any[]> = async (convosdocs, activeuserID) => {
    const convos: any[] = [];
    try {
      await Promise.all(
        convosdocs.map(async (convoDoc) => {
          const participantsCollecRef = collection(
            convoDoc.ref,
            "participants"
          );
          const participantsSnapshot = await getDocs(participantsCollecRef);

          // Check if the user is a participant

          const otherParticipants = participantsSnapshot.docs
            .filter((participant) => participant.id !== activeuserID)
            .map((participant) => participant.data());
          convos.push({
            id: convoDoc.id,
            participants: otherParticipants,
            messages: convoDoc.data().messages,
          });
        })
      );

      return convos.sort();
    } catch (error) {
      console.error("Error fetching conversations:", error);
      return [];
    }
  };

  updateConvo = async (convoId: string, userId: string, value: any) => {
    try {
      await updateDoc(
        doc(this.ConversationsCollecRef, convoId, "participants", userId),
        {
          latest_message: value,
        }
      );
      await updateDoc(doc(this.ConversationsCollecRef, convoId), {
        messages: arrayUnion({
          id: autoid(),
          senderId: userId,
          Date: Timestamp.now(),
          value: value,
        }),
      });
      console.log("updated ", value);
    } catch (err) {
      console.error(err);
    }
  };
}
