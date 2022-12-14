import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../../firebase/auth";
import { firestore, doc, setDoc } from "../../firebase/firestore";
import { useFormik } from "formik";
import { disableBtn, reactivateBtn } from "../../utils/buttonController";
import { useState } from "react";
import { useAtom } from "jotai";
import { showLoginModalAtom, showSignupModalAtom } from "../../atoms/atoms";

// Custom validation
const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "This field is required";
  }

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

export default function SignupModal() {
  const [, setShowLogin] = useAtom(showLoginModalAtom);
  const [, setShowSignup] = useAtom(showSignupModalAtom);
  // The text that shows when an error was catched
  const [signupErr, setSignupErr] = useState("");
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      // Disable the buttons while waiting for the async
      disableBtn();
      // Create a new account
      try {
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = auth.currentUser;
        // Add username, and default profile icon
        await updateProfile(user, {
          displayName: values.username,
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/messager-app-c6790.appspot.com/o/default.jpg?alt=media&token=0859e0fd-3fc4-48e2-9c68-df452e217522",
        });
        // Save data in firestore to be used by other containers
        await setDoc(doc(firestore, "users", user.uid), {
          username: user.displayName,
          icon: user.photoURL,
          uid: user.uid,
        });
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          setSignupErr("There is already an account with this email.");
        }
      } finally {
        // Reactivate the buttons
        setShowSignup(false);
        setShowLogin(false);
        reactivateBtn();
      }
    },
  });
  //
  return (
    <div className="absolute inset-0 flex justify-center items-center ">
      <form
        className="bg-white py-8 px-7 rounded-lg"
        onSubmit={formik.handleSubmit}
      >
        <p className="text-red-500 -mt-2">{signupErr}</p>
        <div className="flex flex-col mb-3">
          <label htmlFor="username">Username</label>
          <input
            className="border-2 border-sky-600 rounded-md px-1 invalid:border-red-500 focus:outline-none"
            type="text"
            id="username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.errors.username && formik.touched.username ? (
            <div className="text-red-500 text-sm">{formik.errors.username}</div>
          ) : null}
        </div>
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="whitespace-nowrap bg-sky-600 border border-sky-600 mb-2 py-1 px-2 rounded-md w-content text-white hover:bg-white  hover:text-sky-600 active:bg-gray-200 "
          data-testid="modal-create-acc-btn"
        >
          Create account
        </button>
        <button
          type="button"
          className="block text-sky-600 hover:underline hover:cursor-pointer"
          data-testid="modal-cancel-btn"
          onClick={() => {
            setShowSignup(false);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
