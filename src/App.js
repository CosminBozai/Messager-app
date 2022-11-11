import { useState, useEffect } from "react";
import "./App.css";
import Header from "./containers/Header/Header";
import FriendList from "./containers/FriendList";
import ChatContainer from "./containers/ChatContainer";
import { auth, onAuthStateChanged } from "./firebase/auth";

function App() {
  // logStatus is passed as a prop to the components to condiotionally render things
  const [logStatus, setLogStatus] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogStatus(true);
      } else {
        setLogStatus(false);
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
