import React, { useState } from "react";
import SignupModal from "./SignupModal";
import { auth, signInWithEmailAndPassword } from "../../firebase/auth";
import "./Modal.css";

export default function LoginModal() {
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function loginUser() {
    await signInWithEmailAndPassword(auth, email, password);
  }
  return (
    <>
      <div className="modal login">
        <form id="login-form">
          <div className="input-field">
            <label htmlFor="login-email">Email address</label>
            <input
              type="email"
              id="login-email"
              required=""
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input-field">
            <label htmlFor="login-password">Your password</label>
            <input
              type="password"
              id="login-password"
              required=""
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            className="form-btn login-btn"
            data-testid="modal-login-btn"
            onClick={loginUser}
          >
            Log in
          </button>
          <div>
            <p>Don't have an account?</p>
            <button
              type="button"
              className="form-btn "
              onClick={() => setShowSignup(true)}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
      {showSignup && <SignupModal setShowSignup={setShowSignup} />}
    </>
  );
}
