import React, {useContext, useEffect, useState} from 'react';
import UserItem from './UserItem';
import { appContext } from './ServerWindow';
import { Icon } from "@iconify/react";


const MemberList = () => {
  const data = useContext(appContext)

  if(data==null || data==undefined) {
    return;
  }

  const [members, setMembers]=useState(data.membersList);
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`w-64 h-screen p-4 bg-[#2A2D37] rounded-tr-lg ${(collapsed)?"w-auto":null}`}>
      <span className="flex justify-between text-sm  mb-4">
      <h3 className={`font-semibold uppercase ${collapsed?"hidden":null}`}>Members</h3>
      <button onClick={()=>{
        setCollapsed(!collapsed)
      }}>
        {collapsed?<Icon icon="tabler:layout-sidebar-right-filled" className="inline text-lg"/>:<Icon icon="tabler:layout-sidebar-right" className="inline text-lg"/>}
      </button>
      </span>
      <ul className={(collapsed)?"hidden":null}>
      {(members!=null)?(members.map((member, index) => (
        <UserItem userID={member} key={member}/>
      ))):(<span>Loading</span>)}
      </ul>
    </div>
  );
};

export default MemberList;
