import { useEffect } from "react";
import "./App.css";
import Header from "./containers/Header";
import FriendList from "./containers/FriendList";
import ChatContainer from "./containers/ChatContainer";
import { auth, onAuthStateChanged } from "./firebase/auth";
import { useAtom } from "jotai";
import { logStatusAtom } from "./atoms/atoms";

function App() {
  // logStatus is passed as a prop to the components to condiotionally render things
  const [logStatus, setLogStatus] = useAtom(logStatusAtom);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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
      <Header />
      {logStatus ? (
        <>
          <FriendList />
          <ChatContainer />
        </>
      ) : null}
    </div>
  );
}

export default App;
