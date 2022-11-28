import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { activeFriendAtom, msgDocAtom, userAtom } from "../atoms/atoms";

export default function Chat() {
  const [user] = useAtom(userAtom);
  const [activeFriend] = useAtom(activeFriendAtom);
  const [msgDoc] = useAtom(msgDocAtom);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (msgDoc !== activeFriend.username) {
      setMessages(() => []);
      setMessages((prev) => prev.concat(msgDoc));
    } else {
      setMessages(() => []);
      setMessages((prev) => [
        ...prev,
        {
          text: `No message with ${activeFriend.username}`,
        },
      ]);
    }
  }, [msgDoc]);
  // This cleans the chat of the previous friend's messages
  useEffect(() => {
    return setMessages(() => []);
  }, [activeFriend]);
  return (
    <div className="h-5/6 ">
      {messages.map((msg, i) => {
        if (msg.sender === user.uid) {
          return (
            <p
              className="block mb-1 px-2 py-1 align-baseline w-max bg-slate-200 rounded-lg text-black"
              key={i}
            >
              {msg.text}
            </p>
          );
        } else {
          return (
            <p
              className="block mb-1 px-2 py-1 align-baseline w-max bg-sky-600 rounded-lg text-white"
              key={i}
            >
              {msg.text}
            </p>
          );
        }
      })}
    </div>
  );
}
