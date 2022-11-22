import React, { useState } from "react";
import SignupModal from "./SignupModal";
import { auth, signInWithEmailAndPassword } from "../../firebase/auth";
import { useFormik } from "formik";
import { disableBtn, reactivateBtn } from "../../utils/buttonController";
import { useAtom } from "jotai";
import { showLoginModalAtom, showSignupModalAtom } from "../../atoms/atoms";

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

export default function LoginModal() {
  const [, setShowLogin] = useAtom(showLoginModalAtom);
  const [showSignup, setShowSignup] = useAtom(showSignupModalAtom);
  // The text that shows when an error was catched
  const [loginErr, setLoginErr] = useState("");

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
            setLoginErr("User doesn't exist. Try signing up.");
          } else if (err.code === "auth/wrong-password") {
            setLoginErr("Wrong password. Try again.");
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
      <div className="absolute inset-0 flex justify-center items-center bg-gray-400/25">
        <form
          id="login-form"
          className="bg-white py-8 px-7 rounded-lg"
          onSubmit={formik.handleSubmit}
        >
          <p className="text-red-500 -mt-2">{loginErr}</p>
          <div className="flex flex-col mb-3">
            <label htmlFor="email">Email address</label>
            <input
              className="border-2 border-sky-600 rounded-md px-1 invalid:border-red-500 focus:outline-none"
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="password">Your password</label>
            <input
              className="border-2 border-sky-600 rounded-md px-1 invalid:border-red-500 focus:outline-none"
              type="password"
              id="password"
              name="password"
              minLength={6}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="mb-3 bg-sky-600 border border-sky-600  p-1 rounded-full w-[4.5rem] text-white hover:bg-white  hover:text-sky-600 active:bg-gray-200 "
          >
            Log in
          </button>
          <div>
            <p className="inline mr-2">Don't have an account?</p>
            <button
              type="button"
              className=" bg-sky-600 border border-sky-600  p-1 rounded-full w-[4.5rem] text-white hover:bg-white  hover:text-sky-600 active:bg-gray-200 "
              onClick={() => setShowSignup(true)}
            >
              Sign up
            </button>
            <button
              className="block text-sky-600 hover:underline hover:cursor-pointer"
              type="button"
              onClick={() => setShowLogin(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      {showSignup && <SignupModal />}
    </>
  );
}
