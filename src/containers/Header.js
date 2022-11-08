import User from "../components/User";

export default function Header({ logStatus }) {
  if (logStatus) {
    return (
      <div id="header">
        <User />
      </div>
    );
  } else {
    return <div id="header">Not logged in</div>;
  }
}
