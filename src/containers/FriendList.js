import UserCard from "../components/User/UserCard";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/auth";
import {
  firestore,
  collection,
  query,
  where,
  getDocs,
} from "../firebase/firestore";

export default function FriendList() {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const user = auth.currentUser;
    async function getData() {
      const q = query(
        collection(firestore, "users"),
        where("username", "!=", user.displayName)
      );
      const querySnap = await getDocs(q);
      querySnap.forEach((doc) => {
        setFriends((current) => [...current, doc.data()]);
      });
    }
    getData();
  }, []);
  return (
    <ul className="w-64 h-[90%] bg-gray-100 border-2" id="friend-list">
      {friends.map((friend) => {
        return <UserCard username={friend.username} icon={friend.icon} />;
      })}
    </ul>
  );
}
