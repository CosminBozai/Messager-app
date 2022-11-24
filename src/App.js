import { useEffect, useState } from "react";
import "./App.css";
import Header from "./containers/Header";
import FriendList from "./containers/FriendList";
import ChatContainer from "./containers/ChatContainer";
import { auth, onAuthStateChanged } from "./firebase/auth";
import { userAtom } from "./atoms/atoms";
import { useAtom } from "jotai";

function App() {
  const [, setCurrentUser] = useAtom(userAtom);
  // logStatus is passed as a prop to the components to condiotionally render things
  const [logStatus, setLogStatus] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(() => user);
      if (user) {
        setLogStatus(() => true);
      } else {
        setLogStatus(() => false);
      }
    });
  });
  return (
    <div
      id="app-container"
      className="bg-white w-8/12 h-[70%] rounded-md shadow-md"
    >
      <Header logStatus={logStatus} />
      <div className="flex h-[90%] w-full">
        {logStatus ? (
          <>
            <FriendList />
            <ChatContainer />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
