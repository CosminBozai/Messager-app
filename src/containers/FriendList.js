import UserCard from "../components/User/UserCard";
import React, { useEffect, useState } from "react";
import {
  firestore,
  collection,
  query,
  where,
  getDocs,
} from "../firebase/firestore";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/atoms";

export default function FriendList() {
  const [user] = useAtom(userAtom);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const q = query(
      collection(firestore, "users"),
      where("uid", "!=", user.uid)
    );
    getDocs(q).then((querySnap) => {
      querySnap.forEach((doc) => {
        setFriends((current) => [...current, doc.data()]);
      });
    });
  }, [user]);

  return (
    <ul
      className="w-20 lg:w-64 h-full py-2 lg:p-2 bg-gray-50 border-2 overflow-scroll"
      id="friend-list"
    >
      {friends.map((friend, i) => {
        return (
          <UserCard
            key={i}
            uid={friend.uid}
            username={friend.username}
            icon={friend.icon}
          />
        );
      })}
    </ul>
  );
}
