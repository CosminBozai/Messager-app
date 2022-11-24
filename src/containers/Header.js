import User from "../components/User/User";
import LoginModal from "../components/Modals/LoginModal";
import { useAtom } from "jotai";
import { logStatusAtom, showLoginModalAtom } from "../atoms/atoms";

export default function Header() {
  // Display the login modal based on the state
  const [showLogin, setShowLogin] = useAtom(showLoginModalAtom);
  const [logStatus] = useAtom(logStatusAtom);
  if (logStatus) {
    return (
      <>
        <div
          id="header"
          className="h-[10%] w-full flex justify-between items-center px-4 bg-white shadow "
        >
          <h1 id="app-title">MESSENGER</h1>
          <div className="flex justify-between items-center gap-2 relative">
            <User />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div
        id="header "
        className="h-14 w-full flex justify-between items-center px-4 bg-white shadow "
      >
        <h1 id="app-title">MESSENGER</h1>
        <div>
          <p className="mx-2 text-sky-600 font-bold inline-block">
            You are not logged in
          </p>
          <button
            className="bg-sky-600 border border-sky-600  p-1 rounded-full w-[4.5rem] text-white hover:bg-white  hover:text-sky-600 active:bg-gray-200 "
            onClick={() => setShowLogin(true)}
          >
            Log in
          </button>
        </div>

        {showLogin && <LoginModal />}
      </div>
    );
  }
}
