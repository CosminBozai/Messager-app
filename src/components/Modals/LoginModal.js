import React, { useState } from "react";
import SignupModal from "./SignupModal";
import "./Modal.css";

export default function LoginModal({ setShowLogin }) {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      <div className="modal login">
        <form id="login-form">
          <div className="input-field">
            <label htmlFor="login-email">Email address</label>
            <input type="email" id="login-email" required="" />
          </div>
          <div className="input-field">
            <label htmlFor="login-password">Your password</label>
            <input type="password" id="login-password" required="" />
          </div>
          <button
            type="button"
            className="form-btn login-btn"
            data-testid="modal-login-btn"
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
