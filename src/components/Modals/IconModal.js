import React from "react";
import { useState } from "react";
import { auth } from "../../firebase/auth";
import { useRef } from "react";
import { storage, ref, uploadBytes } from "../../firebase/storage";
import { disableBtn, reactivateBtn } from "../../utils/buttonController";

export default function IconModal({ setShowIconModal, fetchUserData }) {
  const currentIcon = document
    .querySelector("#profile-icon")
    .getAttribute("src");
  const [iconPrev, setIconPrev] = useState(currentIcon);
  const [icon, setIcon] = useState(null);
  const user = auth.currentUser;
  const inputFile = useRef(null);
  function selectIcon() {
    // `current` points to the mounted file input element
    inputFile.current.click();
  }
  // Display preview of the new icon
  function handleChange(e) {
    setIconPrev(URL.createObjectURL(e.target.files[0]));
    setIcon(e.target.files[0]);
  }
  // Upload the image to the storage belonging to the current user
  function uploadImage() {
    if (icon === null || icon === undefined) return;
    const storageRef = ref(storage, `${user.uid}/icon`);
    // Disable the buttons while waiting for the async
    disableBtn();
    uploadBytes(storageRef, icon).then(() => {
      setShowIconModal(false);
      // Make a call for the updated user data
      fetchUserData();
      // Reactivate the buttons
      reactivateBtn();
    });
  }
  return (
    <div className="modal icon">
      <div className="container">
        <div className="icon-container">
          <img src={iconPrev} alt="#" />
        </div>
        <button onClick={selectIcon}> Select icon </button>
        <button onClick={uploadImage}>Submit</button>
        <input
          onChange={handleChange}
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
        />
        <button onClick={() => setShowIconModal(false)}>Cancel</button>
      </div>
    </div>
  );
}
