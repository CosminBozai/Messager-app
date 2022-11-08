import "./App.css";
import Header from "./components/Header";
import FriendList from "./components/FriendList";
import ChatContainer from "./components/ChatContainer";

function App() {
  return (
    <div id="app-container">
      <Header />
      <FriendList />
      <ChatContainer />
    </div>
  );
}

export default App;
