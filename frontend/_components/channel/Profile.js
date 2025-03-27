"use client";
import React, { useEffect, useState } from 'react';
import * as Icons from "@mielo-ui/adwaita-symbolic-icons-react"


const Profile = ({ userID }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3030/userInfo?userID=${userID}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.res);
      });
  }, [userID]);

  if (!userData) {
    return <li className="my-3 p-1">Loading</li>;
  }

  return (
    <>
      <span className="p-2 flex justify-between items-center w-full hover:bg-[#E4E4E4] border-t-2 border-[#d4d4d4] dark:border-[#333] bg-[#F3F3F3] dark:bg-[#2A2A2A] shadow-sm">
        <div className='flex items-center'>
            <div className="relative">
                <img src={userData.pfpURL} className="w-8 h-8 rounded-full" />
                    <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                        userData.onlinePresence == "Online" ? "bg-[#3F9754]" : "hidden"
                        }`}
                    ></div>
            </div>
            <div className="p-2 ml-2 leading-none">
                    <h4>{userData.username}</h4>
                    <small className="text-[#909090]">Online</small>
            </div>
        </div>
        <div className="pr-2">
            <Icons.Categories.ApplicationsSystem className="icons inline cursor-pointer" />
        </div>
      </span>
    </>
  );
};

export default Profile;