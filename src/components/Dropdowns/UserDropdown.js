import { useState } from "react";
import IconModal from "../Modals/IconModal";
import { auth, signOut } from "../../firebase/auth";

export default function UserDropdown({ fetchUserData, setShowDropdown }) {
  const [showIconModal, setShowIconModal] = useState(false);
  return (
    <div
      id="user-dropdown"
      className="z-10 border-2 shadow absolute -left-[6.5rem] top-12 "
    >
      <div className="py-2 px-3 whitespace-nowrap border-b-2 ">
        <span
          className="text-sky-600 text font-semibold hover:underline hover:cursor-pointer hover:text-sky-500"
          onClick={() => setShowIconModal(true)}
        >
          Change the profile icon
        </span>
      </div>
      <div className="py-2 px-3 ">
        {" "}
        <span
          className="text-sky-600 font-semibold hover:underline hover:cursor-pointer hover:text-sky-500"
          onClick={async () => await signOut(auth)}
        >
          Sign out
        </span>
      </div>
      {showIconModal && (
        <IconModal
          setShowDropdown={setShowDropdown}
          setShowIconModal={setShowIconModal}
          fetchUserData={fetchUserData}
        />
      )}
    </div>
  );
}
