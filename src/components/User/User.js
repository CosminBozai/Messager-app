import React, { useState, useEffect } from "react";
import "./User.css";

export default function User() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch("https://dummyjson.com/users/1");
      const json = await response.json();
      const username = json.firstName;
      const icon = json.image;
      setUserData({ username, icon });
    }
    fetchUserData();
  }, []);

  return (
    <>
      {" "}
      <p>{userData.username}</p>
      <div data-testid="profile-icon" className="user-icon">
        <img src={userData.icon} alt="#"></img>
      </div>
    </>
  );
}