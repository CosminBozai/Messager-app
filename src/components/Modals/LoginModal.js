import React, { useState } from "react";
import SignupModal from "./SignupModal";
import { auth, signInWithEmailAndPassword } from "../../firebase/auth";
import { useFormik } from "formik";
import { disableBtn, reactivateBtn } from "../../utils/buttonController";
import "./Modal.css";

// Custom validation
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "This field is reuqired";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "This field is reuqired";
  } else if (values.password.length <= 5) {
    errors.password = "Password too short";
  }
  return errors;
};

export default function LoginModal({ setShowLogin }) {
  const [showSignup, setShowSignup] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      // Disable the buttons while waiting for the async
      disableBtn();
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
          setShowLogin(false);
        })
        .catch((err) => {
          if (err.code === "auth/user-not-found") {
            alert("User not found. Try signing up");
          } else if (err.code === "auth/wrong-password") {
            alert("Wrong password ");
          }
        })
        .finally(() =>
          // Reactivate the buttons
          reactivateBtn()
        );
    },
  });
  return (
    <>
      <div className="modal login">
        <form onSubmit={formik.handleSubmit} id="login-form">
          <div className="input-field">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="input-field">
            <label htmlFor="password">Your password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <button
            type="submit"
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
            <button type="button" onClick={() => setShowLogin(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      {showSignup && <SignupModal setShowSignup={setShowSignup} />}
    </>
  );
}
