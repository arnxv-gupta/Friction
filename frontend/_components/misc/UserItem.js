"use client"
import React, { useEffect, useState } from 'react';
import UserProfile from './UserProfile';

const UserItem = ({userID}) => {

  const [userData, setUserData] = useState(null);

  console.log(userData);
  

  useEffect(()=>{
    fetch(`http://localhost:3030/userInfo?userID=${userID}`).then(res=>res.json()).then(data=>{
      setUserData(data.res);
    })
  }, [])

  if(!userData) {
    return <li>Loading</li>
  }

  return (
    <li className={`flex items-center my-3 p-1 hover:bg-[#35373C] rounded ${userData.onlinePresence=="Offline"?"opacity-70":null}`}>
      <div className="relative">
        <img
          src={userData.pfpURL}
          className="size-8 rounded-full"
        />
      <div className={`absolute bottom-0 right-0 rounded-full size-3 ${userData.onlinePresence=="Online"?"bg-[#3F9754]":"hidden"}`}></div>
      </div>
       <div className="p-2 ml-2">
        <span>
          {userData.username}
        </span>
       </div>
    </li>
  );
};

export default UserItem;
