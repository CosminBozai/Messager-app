import UserCard from "../components/User/UserCard";

export default function FriendList() {
  return (
    <ul className="w-64 h-[90%] bg-gray-100 border-2" id="friend-list">
      <UserCard />
    </ul>
  );
}
