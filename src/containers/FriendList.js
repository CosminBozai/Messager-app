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
    async function getFriends() {
      const userQuery = query(
        collection(firestore, "users"),
        where("uid", "!=", user.uid)
      );
      const querySnap = await getDocs(userQuery);
      querySnap.forEach((doc) => {
        setFriends((prev) => [...prev, doc.data()]);
      });
    }

    getFriends();
  }, [user]);

  return (
    <ul
      className="w-20 min-w-max lg:w-40 h-full py-2 lg:p-2 bg-gray-50 border-2 overflow-scroll"
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
