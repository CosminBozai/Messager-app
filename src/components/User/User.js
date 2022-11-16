import React, { useState, useEffect } from "react";
import { firestore, doc, getDoc } from "../../firebase/firestore";
import { auth } from "../../firebase/auth";
import { storage, ref, getDownloadURL } from "../../firebase/storage";
import IconModal from "../Modals/IconModal";
import "./User.css";

export default function User() {
  // State that contains the info about the current logged user
  const [userData, setUserData] = useState({});
  const [showIconModal, setShowIconModal] = useState(false);
  const user = auth.currentUser;
  // Get the user data from the database when the component mounts
  async function fetchUserData() {
    const docSnap = await getDoc(doc(firestore, "Users", user.uid));
    const username = docSnap.data().username;
    let iconURL;
    try {
      // User has a custom icon
      iconURL = await getDownloadURL(ref(storage, `${user.uid}/icon`));
    } catch (err) {
      // User has the default icon
      if (err.code === "storage/object-not-found") {
        iconURL = await getDownloadURL(ref(storage, "default.jpg"));
      }
    } finally {
      setUserData({ username, iconURL });
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      {" "}
      <p className="username">{userData.username}</p>
      <div data-testid="profile-icon" className="user-icon">
        <img
          onClick={() => setShowIconModal(true)}
          id="profile-icon"
          src={userData.iconURL}
          alt="#"
        ></img>
      </div>
      {showIconModal && (
        <IconModal
          setShowIconModal={setShowIconModal}
          fetchUserData={fetchUserData}
        />
      )}
    </>
  );
}
