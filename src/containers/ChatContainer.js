import Chat from "../components/Chat";
import Input from "../components/Input";
import React, { useEffect } from "react";
import { firestore, doc, getDoc } from "../firebase/firestore";
import { useAtom } from "jotai";
import { userAtom, activeFriendAtom, msgDocAtom } from "../atoms/atoms";

export default function ChatContainer() {
  const [activeFriend] = useAtom(activeFriendAtom);
  const [user] = useAtom(userAtom);
  const [, setMsgDoc] = useAtom(msgDocAtom);
  useEffect(() => {
    if (activeFriend.uid === undefined) return;
    async function getMsgDoc() {
      // The doc containging the messages between the 2 users is named by the 2 uids...
      //... in alphabetical order
      let userArr = [user.uid, activeFriend.uid].sort();
      const docRef = doc(firestore, "messages", userArr.join("-"));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMsgDoc(() => docSnap.data().messages);
      } else {
        // Done this to rerender the chat after switching between 2 friends with no doc...
        // Otherwise msgDoc will return null for both and "no message" won't display
        setMsgDoc(() => activeFriend.username);
      }
    }
    getMsgDoc();
  }, [activeFriend]);
  //
  if (activeFriend.uid === undefined) {
    return <div className="flex-auto" id="chat-container"></div>;
  } else {
    return (
      <div className="flex-auto" id="chat-container">
        <Chat />
        <div className="h-1/6 flex items-center justify-around border-t-2 shadow-md">
          <Input />
        </div>
      </div>
    );
  }
}
