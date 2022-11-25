import React, { useEffect, useRef } from "react";
import {
  doc,
  firestore,
  Timestamp,
  setDoc,
  updateDoc,
  arrayUnion,
} from "../firebase/firestore";
import { userAtom, activeFriendAtom, msgDocAtom } from "../atoms/atoms";
import { useAtom } from "jotai";

export default function Input() {
  const inputMsgRef = useRef(null);
  const [user] = useAtom(userAtom);
  const [activeFriend] = useAtom(activeFriendAtom);
  const [msgDoc] = useAtom(msgDocAtom);
  async function sendMessage() {
    if (inputMsgRef.current.value === undefined) return;

    const userArr = [user.uid, activeFriend.uid].sort();
    const docRef = doc(firestore, "messages", userArr.join("-"));
    if (msgDoc === activeFriend.username) {
      await setDoc(docRef, {
        messages: [
          {
            sender: user.uid,
            text: inputMsgRef.current.value,
            time: Timestamp.now(),
          },
        ],
      });
    } else {
      await updateDoc(docRef, {
        messages: arrayUnion({
          sender: user.uid,
          text: inputMsgRef.current.value,
          time: Timestamp.now(),
        }),
      });
    }

    inputMsgRef.current.value = "";
  }
  useEffect(() => {});
  return (
    <>
      <input
        className="w-80 h-10 border border-black"
        type="text"
        ref={inputMsgRef}
      ></input>
      <button
        className="bg-sky-600 p-2 text-white"
        type="button"
        onClick={sendMessage}
      >
        Send
      </button>
    </>
  );
}
