import User from "../../components/User/User";
import LogInButton from "../../components/LogInButton/LogInButton";
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
        <LogInButton logStatus={logStatus} setLogStatus={setLogStatus} />
      </div>
    );
  }
}
