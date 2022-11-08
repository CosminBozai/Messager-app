import React, { useState, useEffect } from "react";

export default function User() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchUserData() {
      let response = await fetch("https://dummyjson.com/users/1");
      let { firstName, image } = await response.json();
      setUserData({ firstName, image });
    }
    fetchUserData();
  }, []);

  return (
    <div>
      <p>{userData.firstName}</p>
      {<img src={userData.image} className="user-icon" alt="#"></img>}
    </div>
  );
}
