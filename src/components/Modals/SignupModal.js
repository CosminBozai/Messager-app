import { firestore, doc, setDoc } from "../../firebase/firestore";
import { auth, createUserWithEmailAndPassword } from "../../firebase/auth";
import { useFormik } from "formik";
import { disableBtn, reactivateBtn } from "../../utils/buttonController";
import { useState } from "react";
import { useAtom } from "jotai";
import { showLoginModalAtom, showSignupModalAtom } from "../../atoms/atoms";
import { storage, ref, uploadBytes } from "../../firebase/storage";
import dataURLtoFile from "../../utils/ImgToFile";
import { data } from "autoprefixer";

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
        const userCred = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        // Add a new document in collection "Users"
        await setDoc(doc(firestore, "Users", userCred.user.uid), {
          username: values.username,
          email: userCred.user.email,
        });
        // Add a default profile pic in storage
        const storageRef = ref(storage, `${userCred.user.uid}/icon`);
        const file = dataURLtoFile("icon");
        await uploadBytes(storageRef, file);

        setShowLogin(false);
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          setSignupErr("There is already an account with this email.");
        }
      } finally {
        // Reactivate the buttons
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
