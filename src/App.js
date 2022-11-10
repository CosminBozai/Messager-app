import { useState, useEffect } from "react";
import "./App.css";
import Header from "./containers/Header/Header";
import FriendList from "./containers/FriendList";
import ChatContainer from "./containers/ChatContainer";
import { auth, onAuthStateChanged } from "./firebase";

function App() {
  const [logStatus, setLogStatus] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogStatus(true);
        console.log("da");
      } else {
        setLogStatus(false);
        console.log("nu");
      }
    });
  });
  return (
    <div id="app-container">
      <Header logStatus={logStatus} setLogStatus={setLogStatus} />
      <FriendList />
      <ChatContainer />
    </div>
  );
}

export default App;
