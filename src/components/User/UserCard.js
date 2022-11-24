import React from "react";

export default function UserCard({ uid, username, icon }) {
  function addFocus(e) {
    console.log(e.target);
    e.target.closest("li").focus();
  }
  return (
    <li
      className="group/friend h-16 w-full flex items-center justify-center lg:gap-3 px-2 rounded-md transition-all hover:bg-neutral-200 hover:cursor-pointer focus:bg-sky-600"
      tabIndex="0"
      onClick={addFocus}
    >
      <img
        className="inline-block h-9 w-9 border-2 border-sky-600 rounded-full"
        src={icon}
        alt="#"
      ></img>
      <div>
        <p className="hidden lg:inline-block group-focus/friend:text-white text-lg tracking-wide">
          {username}
        </p>
        <p className="hidden lg:inline-block group-focus/friend:text-zinc-100 text-sm font-medium text-zinc-400">
          placeholder text blablabla
        </p>
      </div>
    </li>
  );
}
