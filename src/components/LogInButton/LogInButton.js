import React from "react";

export default function LogInButton({ logStatus, setLogStatus }) {
  return <button onClick={() => setLogStatus(!logStatus)}>Log in</button>;
}
