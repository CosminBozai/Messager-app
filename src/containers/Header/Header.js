import User from "../../components/User/User";
import LoginButton from "../../components/LoginButton/LoginButton";
import "./Header.css";

export default function Header({ logStatus, setLogStatus }) {
  if (logStatus) {
    return (
      <div id="header">
        <User />
      </div>
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
