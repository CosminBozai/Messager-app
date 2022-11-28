import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { activeFriendAtom, msgDocAtom } from "../atoms/atoms";

export default function Chat() {
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
    <div className="h-5/6">
      {messages.map((msg, i) => {
        return <p key={i}>{msg.text}</p>;
      })}
    </div>
  );
}
