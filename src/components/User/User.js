import React, { useState } from "react";
import { auth } from "../../firebase/auth";
import UserDropdown from "../Dropdowns/UserDropdown";

export default function User() {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = auth.currentUser;

  return (
    <>
      {" "}
      <p className="text-sky-600 font-bold">{user.displayName}</p>
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
