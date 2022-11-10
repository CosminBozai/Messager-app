import User from "../../components/User/User";
import LoginButton from "../../components/LoginButton/LoginButton";
import { auth, signOut } from "../../firebase";
import "./Header.css";

export default function Header({ logStatus, setLogStatus }) {
  if (logStatus) {
    return (
      <>
        <div id="header">
          <button
            onClick={async () => {
              await signOut(auth);
            }}
          >
            Sign out
          </button>
          <User />
        </div>
      </>
    );
  } else {
    return (
      <div id="header">
        {" "}
        You are not logged in{" "}
        <LoginButton logStatus={logStatus} setLogStatus={setLogStatus} />
      </div>
    );
  }
}
