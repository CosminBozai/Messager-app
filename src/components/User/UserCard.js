import React from "react";
import { useAtom } from "jotai";
import { activeFriendAtom, focusedAtom } from "../../atoms/atoms";

export default function UserCard({ uid, username, icon }) {
  const [focused, setFocused] = useAtom(focusedAtom);
  const [activeFriend, setActiveFriend] = useAtom(activeFriendAtom);
  function handleClick() {
    if (activeFriend.uid === uid) return;
    setActiveFriend(() => ({ uid, username }));
    setFocused(() => uid);
  }
  return (
    <li
      className={`${
        focused === uid ? "bg-sky-600" : "hover:bg-neutral-200"
      } h-16 w-full flex items-center justify-center lg:gap-3 px-2 rounded-md transition-all hover:cursor-pointer`}
      onClick={handleClick}
    >
      <img
        className="inline-block h-9 w-9 border-2 border-sky-600 rounded-full"
        src={icon}
        alt="#"
      ></img>

      <p
        className={`${
          focused === uid ? "text-white" : "text-black"
        } hidden lg:inline-block text-lg tracking-wide`}
      >
        {username}
      </p>
    </li>
  );
}
