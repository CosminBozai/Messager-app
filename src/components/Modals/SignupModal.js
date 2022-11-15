import { useState } from "react";
import { firestore, doc, setDoc } from "../../firebase/firestore";
import { auth, createUserWithEmailAndPassword } from "../../firebase/auth";

export default function SignupModal({ setShowSignup, setShowLogin }) {
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
    await setDoc(doc(firestore, "Users", userCred.user.uid), {
      username,
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
        <button
          type="button"
          className="form-btn cancel-btn"
          data-testid="modal-cancel-btn"
          onClick={() => {
            setShowSignup(false);
            setShowLogin(false);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
