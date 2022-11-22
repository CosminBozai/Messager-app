import React, { useState, useEffect } from "react";
import { firestore, doc, getDoc } from "../../firebase/firestore";
import { auth } from "../../firebase/auth";
import { storage, ref, getDownloadURL } from "../../firebase/storage";
import UserDropdown from "../Dropdowns/UserDropdown";
import { useAtom } from "jotai";
import { dropdownAtom } from "../../atoms/atoms";

export default function User() {
  // State that contains the info about the current logged user
  const [userData, setUserData] = useState({});
  const [showDropdown, setShowDropdown] = useAtom(dropdownAtom);
  const user = auth.currentUser;
  // Get the user data from the database when the component mounts
  async function fetchUserData() {
    const docSnap = await getDoc(doc(firestore, "Users", user.uid));
    const username = docSnap.data().username;
    const iconURL = await getDownloadURL(ref(storage, `${user.uid}/icon`));
    setUserData({ username, iconURL });
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      {" "}
      <p className="text-sky-600 font-bold">{userData.username}</p>
      <div className="w-9 h-9 border-2 rounded-full border-sky-600 hover:cursor-pointer">
        {
          <img
            className="object-cover w-full h-full rounded-full block"
            onClick={() => setShowDropdown(!showDropdown)}
            id="profile-icon"
            src={userData.iconURL}
            alt="#"
          ></img>
        }
      </div>
      {showDropdown && <UserDropdown fetchUserData={fetchUserData} />}
    </>
  );
}
