import React, { useContext, useEffect, useState } from 'react';
import UserItem from './UserItem';
import { appContext } from '../server/ServerWindow';

const MemberList = ({ collapsed }) => {
  const data = useContext(appContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [offlineUsers, setOfflineUsers] = useState([]);
  const members = data?.membersList || [];

  useEffect(() => {
    const fetchMemberStatuses = async () => {
      const online = [];
      const offline = [];

      for (const memberId of members) {
        try {
          const res = await fetch(`http://localhost:3030/userInfo?userID=${memberId}`);
          const userData = await res.json();
          if (userData?.res?.onlinePresence === "Online") {
            online.push(memberId);
          } else {
            offline.push(memberId);
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
      setOnlineUsers(online);
      setOfflineUsers(offline);
    };

    if (members.length > 0) {
      fetchMemberStatuses();
    }
  }, [members]);

  if (!data || collapsed) {
    return null;
  }

  return (
    <div className={`w-64 h-screen p-4 mr-1 border-x-2 border-[#d4d4d4] dark:border-[#333] bg-[#F3F3F3] dark:bg-[#2A2A2A] ${collapsed ? "w-auto" : ""}`}>
      <div className={`${collapsed ? "hidden" : ""}`}>
        <span className="flex justify-between text-sm mb-4">
          <h3>Online - ({onlineUsers.length})</h3>
        </span>
        <ul className="mb-4">
          {onlineUsers.map((member) => (
            <UserItem userID={member} key={`online-${member}`} />
          ))}
        </ul>

        <span className="flex justify-between text-sm mb-4">
          <h3>Offline - ({offlineUsers.length})</h3>
        </span>
        <ul>
          {offlineUsers.map((member) => (
            <UserItem userID={member} key={`offline-${member}`} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MemberList;