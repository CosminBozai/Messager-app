import React, { useEffect } from "react";
import { useState } from "react";
import {
  db,
  doc,
  setDoc,
  auth,
  createUserWithEmailAndPassword,
} from "../../firebase";

export default function SignupModal({ setShowSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // Create a new account
  async function createUser() {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Add a new document in collection "Users"
    await setDoc(doc(db, "Users", username), {
      name: username,
      email: userCred.user.email,
    });
  }
  //
  return (
    <div className="modal signup">
      <form id="signup-form">
        <div className="input-field">
          <label htmlFor="signup-username">Username</label>
          <input
            type="text"
            id="signup-username"
            required=""
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="input-field">
          <label htmlFor="signup-email">Email address</label>
          <input
            type="email"
            id="signup-email"
            required=""
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="input-field">
          <label htmlFor="signup-password">Your password</label>
          <input
            type="password"
            id="signup-password"
            required=""
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          type="button"
          className="form-btn create-acc-btn"
          data-testid="modal-create-acc-btn"
          onClick={createUser}
        >
          Create account
        </button>
      </form>
    </div>
  );
}
