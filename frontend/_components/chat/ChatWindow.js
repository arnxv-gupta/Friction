"use client"

import React, { useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import * as Icons from "@mielo-ui/adwaita-symbolic-icons-react"

import { appContext } from "../server/ServerWindow";

import ChatItem from "./ChatItem";
import ChatInput from "./ChatInput";
import VideoView from "../misc/VideoView";
import FriendsList from "../friend/FriendsList";

const ChatWindow = ({collapsed, setCollapsed}) => {
  const data = useContext(appContext);
  const pathname = usePathname().split("/");
  const channelName = data!=null && data.currChannel && data.channels[data.channels.findIndex((channel)=>data.currChannel==channel.channelID)].name;   
  
  if ((data == null || !data.currChannel) && pathname[2]=="@me"&& pathname.length==3) {
    return (
      <div className="flex-1 flex flex-row bg-[#FAFAFA] dark:bg-[#2C2C2C] rounded-tl-2xl">
        <FriendsList/>
        
      </div>
    );
  } else if((data==null || !data.currChannel) && pathname[2]=="@me" && pathname.length==4) {
    return (
      <div className="flex-1 flex flex-row bg-[#FAFAFA] dark:bg-[#2C2C2C] rounded-tl-2xl">
        <FriendsList/>
        <div>
          {pathname[3]}
        </div>
      </div>
    );
  } else if(data==null||!data.currChannel) {
    return (
      <div className="flex-1 p-6 flex flex-col justify-between bg-[#FAFAFA] dark:bg-[#2C2C2C]">
        <small>This looks empty.. too empty :(</small>{" "}
      </div>
    );
  }

  // VOICE CHAT
  if(data!=null && data.channels[data.channels.findIndex((channel)=>data.currChannel==channel.channelID)].type=="voice") {
  
    useEffect(()=>{
      fetch("http://localhost:3030/joinVoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({serverID: data.serverID, channelID: data.currChannel, userID: localStorage.getItem("userID")})
      }).then(res=>res.json()).then(data=>{
        console.log(data);
      })
    }, []);
    

    return (
      <div className="flex-1 p-6 flex flex-col justify-between bg-[#FAFAFA] dark:bg-[#2C2C2C]  max-h-[100lvh] ">
      Voice chat
      <VideoView />
      <ul>
      {data!=null && data.channels[data.channels.findIndex((channel)=>data.currChannel==channel.channelID)].data.map(el=>{
        return <li>{el}</li>
      })}
      </ul>
      </div>
    )
  }
  // END OF VOICE CHAT

  if (data != null && data.channels[data.channels.findIndex((channel)=>data.currChannel==channel.channelID)].data.length==0) {
    return (
      <div className="flex-1 p-6 flex flex-col justify-between bg-[#FAFAFA] dark:bg-[#2C2C2C]">
        <small>This looks empty.. too empty :(</small>
        <ChatInput
          userID={localStorage.getItem("userID")}
          serverID={data.serverID}
          chatID={data.currChannel}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#FAFAFA] dark:bg-[#2C2C2C] max-h-screen w-full">
    <div className="text-lg flex justify-between items-center font-bold mb-4 px-4 py-2 border-b-2 border-[#d4d4d4] dark:border-[#333]">
      <div>
        <Icons.Actions.SystemSearch className="icons" />
      </div>
      {channelName}
      <div className="flex gap-x-2">
        {collapsed?<Icons.Actions.SidebarShow className="icons" onClick={()=>{
          setCollapsed(false)
        }}/>:<Icons.Actions.SidebarShowRight className="icons" onClick={()=>{
          setCollapsed(true)
        }}/>}
        <Icons.Categories.ApplicationsSystem className="icons"/>
      </div>
    </div>
    <div className="flex-1 pb-6 flex flex-col justify-between max-h-[100lvh] ">
      <ul className="max-h-[80lvh] overflow-y-scroll">
        {
        (()=>{
          
        let prevID=null;
        let channel = data.channels[data.channels.findIndex((channel)=>{
          return data.currChannel==channel.channelID;
        })];

        return channel.data.map((el) => {
          let isAuthorSame = el.authorID==prevID;
          prevID=el.authorID

          return (
            <ChatItem
              authorID={el.authorID}
              roleData={data.roles.filter((element)=>element.assignedTo.includes(el.authorID))[0]}
              text={el.data}
              timestamp={el.timestamp}
              key={el.timestamp}
              image={el.image}
              continued={isAuthorSame}
              type={el?.type || "text"}
            />
          );

        })
        })()
        }
      </ul>
      <ChatInput
        userID={localStorage.getItem("userID")}
        serverID={data.serverID}
        chatID={data.currChannel}
      />
    </div>
    </div>
  );
};

export default ChatWindow;
