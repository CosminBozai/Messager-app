import User from "../../components/User/User";
import LoginModal from "../../components/Modals/LoginModal";
import { auth, signOut } from "../../firebase/auth";
import { useState } from "react";
import "./Header.css";

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
      <div id="header">
        {" "}
        <p>You are not logged in</p>
        <button onClick={() => setShowLogin(true)}>Log in</button>
        {showLogin && <LoginModal setShowLogin={setShowLogin} />}
      </div>
    );
  }
}
