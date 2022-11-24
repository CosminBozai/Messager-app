export default function ChatContainer() {
  return (
    <div className="flex-auto" id="chat-container">
      <div className="h-5/6"></div>
      <div className="h-1/6 flex items-center justify-around border-t-2 shadow-md">
        <input className="w-80 h-10 border border-black" type="text"></input>
        <button className="bg-sky-600 p-2 text-white" type="button">
          Send
        </button>
      </div>
    </div>
  );
}
