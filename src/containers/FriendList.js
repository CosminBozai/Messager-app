import UserCard from "../components/User/UserCard";
import React, { useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "../firebase/auth";
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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(
          collection(firestore, "users"),
          where("uid", "!=", user.uid)
        );
        getDocs(q).then((querySnap) => {
          querySnap.forEach((doc) => {
            setFriends((current) => [...current, doc.data()]);
          });
        });
      } else return;
    });
  }, []);

  return (
    <ul className="w-64 h-[90%] bg-gray-100 border-2" id="friend-list">
      {friends.map((friend, i) => {
        return (
          <UserCard key={i} username={friend.username} icon={friend.icon} />
        );
      })}
    </ul>
  );
}
