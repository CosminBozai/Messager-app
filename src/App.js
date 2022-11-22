import { useEffect } from "react";
import "./App.css";
import Header from "./containers/Header/Header";
import FriendList from "./containers/FriendList";
import ChatContainer from "./containers/ChatContainer";
import { auth, onAuthStateChanged } from "./firebase/auth";
import { useAtom } from "jotai";
import { logStatusAtom } from "./atoms/atoms";

function App() {
  // logStatus is passed as a prop to the components to condiotionally render things
  const [, setLogStatus] = useAtom(logStatusAtom);
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
    <div
      id="app-container"
      className="bg-white w-9/12 h-[70%] rounded-md shadow-md"
    >
      <Header />
      <FriendList />
      <ChatContainer />
    </div>
  );
}

export default App;
