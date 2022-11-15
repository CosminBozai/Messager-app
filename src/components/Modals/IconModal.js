import React from "react";
import { useState } from "react";
import { auth } from "../../firebase/auth";
import { useEffect, useRef } from "react";
import { storage, ref, uploadBytes } from "../../firebase/storage";

export default function IconModal({ setShowIconModal }) {
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
    const storageRef = ref(storage, `${user.uid}/icon`);
    uploadBytes(storageRef, icon).then(() => setShowIconModal(false));
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
      </div>
    </div>
  );
}
