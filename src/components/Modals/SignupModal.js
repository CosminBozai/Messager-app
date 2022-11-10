import React from "react";

export default function SignupModal({ setShowSignup }) {
  return (
    <div className="modal signup">
      <form id="signup-form">
        <div className="input-field">
          <label htmlFor="signup-email">Email address</label>
          <input type="email" id="signup-email" required="" />
        </div>
        <div className="input-field">
          <label htmlFor="signup-password">Your password</label>
          <input type="password" id="signup-password" required="" />
        </div>
        <button
          type="button"
          className="form-btn create-acc-btn"
          data-testid="modal-create-acc-btn"
        >
          Create account
        </button>
      </form>
    </div>
  );
}
