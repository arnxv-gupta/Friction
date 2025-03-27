import React, {useContext, useEffect, useState} from 'react';
import UserItem from './UserItem';
import { appContext } from '../server/ServerWindow';
import { Icon } from "@iconify/react";


const MemberList = ({collapsed}) => {
  const data = useContext(appContext)

  if(data==null || data==undefined || collapsed) {
    return;
  }

  const members =  data.membersList;
  

  return (
    <div className={`w-64 h-screen p-4 mr-1 border-x-2 border-[#d4d4d4] dark:border-[#333] bg-[#F3F3F3] dark:bg-[#2A2A2A] ${(collapsed)?"w-auto":null}`}>
      <span className="flex justify-between text-sm  mb-4">
      <h3 className={`s${collapsed?"hidden":null}`}>Online - ({members.length})</h3>
      </span>
      <ul className={`${(collapsed)?"hidden":null}`}>
      {members.map((member) => (
        <UserItem userID={member} key={member}/>
      ))}
      </ul>
    </div>
  );
};

export default MemberList;
