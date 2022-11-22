import React from "react";

export default function UserCard({ username, icon }) {
  return (
    <li className="h-16 w-full border border-black">
      <img
        className="inline-block h-8 w-8 rounded-full"
        src={icon}
        alt="#"
      ></img>
      <p className="inline">{username}</p>
    </li>
  );
}
