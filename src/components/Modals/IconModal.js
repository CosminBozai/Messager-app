import React from "react";
import { useState } from "react";
import { auth } from "../../firebase/auth";
import { useRef } from "react";
import { storage, ref, uploadBytes } from "../../firebase/storage";
import { disableBtn, reactivateBtn } from "../../utils/buttonController";

export default function IconModal({
  setShowIconModal,
  setShowDropdown,
  fetchUserData,
}) {
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
      setShowDropdown(false);
      setShowIconModal(false);
      // Make a call for the updated user data
      fetchUserData();
      // Reactivate the buttons
      reactivateBtn();
    });
  }
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-400/25">
      <div className="bg-white p-3 rounded-lg">
        <div className="w-72 mb-6 ">
          <img
            className="shadow-md border-1 border-sky-600"
            src={iconPrev}
            alt="#"
          />
        </div>
        <button
          className="block whitespace-nowrap bg-sky-600 border border-sky-600 mb-2 py-1 px-2 rounded-md w-content text-white hover:bg-white  hover:text-sky-600 active:bg-gray-200 "
          onClick={selectIcon}
        >
          {" "}
          Select icon{" "}
        </button>
        <button
          className="block whitespace-nowrap bg-sky-600 border border-sky-600 mb-2 py-1 px-2 rounded-md w-content text-white hover:bg-white  hover:text-sky-600 active:bg-gray-200 "
          onClick={uploadImage}
        >
          Submit
        </button>
        <input
          onChange={handleChange}
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
        />
        <button
          className="block text-sky-600 hover:underline hover:cursor-pointer"
          onClick={() => setShowIconModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
