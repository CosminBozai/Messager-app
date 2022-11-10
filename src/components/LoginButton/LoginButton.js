import React from "react";
import { useState } from "react";
import LoginModal from "../Modals/LoginModal";

export default function LoginButton({ logStatus, setLogStatus }) {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <button onClick={() => setShowLogin(true)}>Log in</button>
      {showLogin && <LoginModal setShowLogin={setShowLogin} />}
    </>
  );
}
