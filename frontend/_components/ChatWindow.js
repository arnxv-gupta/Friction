import React, { useContext, useEffect, useRef, useState } from "react";
import ChatItem from "./ChatItem";
import ChatInput from "./ChatInput";
import { appContext } from "./ServerWindow";
import { socketContext } from '@/app/layout';
import VideoView from "./VideoView";
import FriendsList from "./FriendsList";
import { usePathname } from "next/navigation";
import { FaHashtag } from "react-icons/fa";



const ChatWindow = () => {
  const data = useContext(appContext);
  const pathname = usePathname().split("/");
  const channelName = data!=null && data.currChannel && data.channels[data.channels.findIndex((channel)=>data.currChannel==channel.channelID)].name; 

  const {socketData, sendMessage} = useContext(socketContext)
  
  
  if ((data == null || !data.currChannel) && pathname[2]=="@me"&& pathname.length==3) {
    return (
      <div className="flex-1 flex flex-row bg-[#313338]">
        <FriendsList/>
        asdas
      </div>
    );
  } else if((data==null || !data.currChannel) && pathname[2]=="@me" && pathname.length==4) {
    return (
      <div className="flex-1 flex flex-row bg-[#313338]">
        <FriendsList/>
        <div>
          {pathname[3]}
        </div>
      </div>
    );
  } else if(data==null||!data.currChannel) {
    return (
      <div className="flex-1 p-6 flex flex-col justify-between bg-[#313338]">
        <small>This looks empty.. too empty :(</small>{" "}
      </div>
    );
  }

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
      <div className="flex-1 p-6 flex flex-col justify-between bg-[#313338]  max-h-[100lvh] ">
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

  if (data != null && data.channels[data.channels.findIndex((channel)=>data.currChannel==channel.channelID)].data.length==0) {
    return (
      <div className="flex-1 p-6 flex flex-col justify-between bg-[#313338]">
        <small>This looks empty.. too empty :(</small>
        <ChatInput
          userID={localStorage.getItem("userID")}
          serverID={data.serverID}
          chatID={data.currChannel}
        />
      </div>
    );
  }  

  console.log(data);
 

  return (
    <div className="flex flex-col bg-[#202329] w-full">
    <div className="text-lg flex items-center px-4 py-2">
    <FaHashtag /> {channelName}
    </div>
    <div className="flex-1 pb-6 flex flex-col justify-between max-h-[100lvh] ">
      <ul className="overflow-y-scroll">
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
              color={data.roles.filter((element)=>element.assignedTo.includes(el.authorID))[0]}
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
