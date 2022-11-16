import { firestore, doc, setDoc } from "../../firebase/firestore";
import { auth, createUserWithEmailAndPassword } from "../../firebase/auth";
import { useFormik } from "formik";

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

export default function SignupModal({ setShowSignup }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      // Create a new account
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
    },
  });
  //
  return (
    <div className="modal signup">
      <form onSubmit={formik.handleSubmit} id="signup-form">
        <div className="input-field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.errors.username && formik.touched.username ? (
            <div className="error">{formik.errors.username}</div>
          ) : null}
        </div>
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
          className="form-btn create-acc-btn"
          data-testid="modal-create-acc-btn"
        >
          Create account
        </button>
        <button
          type="button"
          className="form-btn cancel-btn"
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
