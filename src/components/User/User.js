import React, { useState, useEffect } from "react";
import { firestore, doc, getDoc } from "../../firebase/firestore";
import { auth } from "../../firebase/auth";
import "./User.css";

export default function User() {
  // State that contains the info about the current logged user
  const [userData, setUserData] = useState({});
  const user = auth.currentUser;
  // Get the user data from the database when the component mounts
  useEffect(() => {
    async function fetchUserData() {
      const docSnap = await getDoc(doc(firestore, "Users", user.email));
      const username = docSnap.data().username;
      setUserData({ username });
    }
    fetchUserData();
  }, []);

  return (
    <>
      {" "}
      <p className="username">{userData.username}</p>
      <div data-testid="profile-icon" className="user-icon">
        <img src="../../images/default.jpg" alt="#"></img>
      </div>
    </>
  );
}
