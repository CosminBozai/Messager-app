import User from "../../components/User/User";
import LoginModal from "../../components/Modals/LoginModal";
import { auth, signOut } from "../../firebase/auth";
import { useState } from "react";

export default function Header({ logStatus }) {
  // Display the login modal based on the state
  const [showLogin, setShowLogin] = useState(false);
  if (logStatus) {
    return (
      <>
        <div id="header">
          <button
            onClick={async () => {
              await signOut(auth);
            }}
          >
            Sign out
          </button>
          <User />
        </div>
      </>
    );
  } else {
    return (
      <div
        id="header "
        className="h-14 w-full flex justify-between items-center px-4 bg-white shadow "
      >
        <h1 id="app-title">MESSENGER</h1>
        <div>
          <p className="mx-2 text-sky-600 font-bold">You are not logged in</p>
          <button
            className="bg-sky-600  p-1 rounded-full w-[4.5rem] text-white hover:bg-white hover:border hover:border-sky-600 hover:text-sky-600 active:bg-gray-200"
            onClick={() => setShowLogin(true)}
          >
            Log in
          </button>
        </div>

        {showLogin && <LoginModal setShowLogin={setShowLogin} />}
      </div>
    );
  }
}
