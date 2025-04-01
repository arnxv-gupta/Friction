"use client";
import React, { useEffect, useState, useRef } from 'react';
import UserProfile from './UserProfile';

const UserItem = ({ userID }) => {
  const [userData, setUserData] = useState(null);
  const [isProfileVisible, setProfileVisible] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:3030/userInfo?userID=${userID}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.res);
      });

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileVisible(false);
      }
    };

    if (isProfileVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userID, isProfileVisible]);

  if (!userData) {
    return <li className="my-3 p-1">Loading</li>;
  }

  return (
    <>
      <li
        onClick={() => {
          setProfileVisible(true);
        }}
        className={`relative flex items-center my-3 p-1 hover:bg-[#E4E4E4] dark:hover:bg-[#484747] rounded ${
          userData.onlinePresence == "Offline" ? "opacity-70" : ""
        }`}
      >
        <div className="relative">
          <img src={userData.pfpURL} className="w-8 h-8 rounded-full" />
          <div
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
              userData.onlinePresence == "Online" ? "bg-[#3F9754]" : "hidden"
            }`}
          ></div>
        </div>
        <div className="p-2 ml-2">
          <span>{userData.username}</span>
        </div>
        {isProfileVisible && (
          <div ref={profileRef} className="absolute top-full left-0 z-10">
            <div className="absolute left-[-200px] top-[-50px]">
            <UserProfile userID={userID}/>
            </div>
          </div>
        )}
      </li>
    </>
  );
};

export default UserItem;