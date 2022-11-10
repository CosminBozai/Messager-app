import React, { useState, useEffect } from "react";
import { auth, db, doc, getDoc } from "../../firebase";
import "./User.css";

export default function User() {
  // State that contains the info about the current logged user
  const [userData, setUserData] = useState({});
  const user = auth.currentUser;
  // Get the user data from the database when the component mounts
  useEffect(() => {
    async function fetchUserData() {
      const docRef = doc(db, "Users", user.email);
      const docSnap = await getDoc(docRef);
      const username = docSnap.data().username;
      setUserData({ username });
    }
    fetchUserData();
  }, []);

  return (
    <>
      {" "}
      <p>{userData.username}</p>
      <div data-testid="profile-icon" className="user-icon">
        <img src="../../images/default.jpg" alt="#"></img>
      </div>
    </>
  );
}
