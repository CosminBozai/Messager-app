import React, { useState } from "react";
import UserDropdown from "../Dropdowns/UserDropdown";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms/atoms";

export default function User() {
  const [user] = useAtom(userAtom);
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <>
      {" "}
      <p className="text-sky-600 text-lg font-bold tracking-wide">
        {user.displayName}
      </p>
      <div className="w-9 h-9 border-2 rounded-full border-sky-600 hover:cursor-pointer">
        {
          <img
            className="object-cover w-full h-full rounded-full block"
            onClick={() => setShowDropdown(!showDropdown)}
            id="profile-icon"
            src={user.photoURL}
            alt="#"
          ></img>
        }
      </div>
      {showDropdown && <UserDropdown />}
    </>
  );
}
