"use client"
import React, { useEffect, useState } from 'react';
import UserProfile from './UserProfile';

const UserItem = ({userID}) => {

  const [userData, setUserData] = useState(null);

  useEffect(()=>{
    fetch(`http://localhost:3030/userInfo?userID=${userID}`).then(res=>res.json()).then(data=>{
      setUserData(data.res);
    })
  }, [])

  return (
    <div className="group">
      <div className="hidden group-hover:block" >
        {userData && <UserProfile userID={userData.userID}/>}
      </div>
    <div className="p-3 text-sm hover:bg-[#35373C] rounded">
      <div className="flex items-center">
        <img 
        className="w-9 h-9 bg-gray-600 rounded-full"
        src={(userData!=null?(userData.pfpURL):("Loading"))}
        />
        <span>{(userData!=null)?userData.onlinePresence:null}</span>
        <div className="ml-2">
          <p className="font-bold">{(userData!=null?(userData.username):("Loading"))}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserItem;
