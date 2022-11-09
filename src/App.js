import { useState } from "react";
import "./App.css";
import Header from "./containers/Header/Header";
import FriendList from "./containers/FriendList";
import ChatContainer from "./containers/ChatContainer";

function App() {
  const [logStatus, setLogStatus] = useState(false);
  return (
    <div id="app-container">
      <Header logStatus={logStatus} setLogStatus={setLogStatus} />
      <FriendList />
      <ChatContainer />
    </div>
  );
}

export default App;
