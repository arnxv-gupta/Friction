"use client"

import { useParams } from "next/navigation";
import ChatWindow from "@/_components/chat/ChatWindow";
import ChannelList from "@/_components/channel/ChannelList";
import MemberList from "@/_components/misc/MemberList";
import { createContext, useContext, useEffect, useState } from "react";
import { socketContext } from '@/app/layout';


export const appContext = createContext();

export default function ServerWindow() {
  const {socketData, sendMessage} = useContext(socketContext)
  const [data, setData] = useState(null);
  const params = useParams();


  useEffect(() => {
    if(params.slug[0]!="%40me") {
    fetch(`http://localhost:3030/serverInfo?serverID=${params.slug[0]}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.type == "SUCCESS") {
          
          let nData = data.res;
          nData.currChannel=params.slug[1];
          nData.currCategory=params.slug[1] && nData.channels[nData.channels.findIndex((el)=>el.channelID==params.slug[1])].categoryID;
          setData(nData);
        }
      });
    }
  }, [socketData]);

  return (
    <div className="flex flex-1">
      <appContext.Provider value={data}>
        <ChannelList/>
        <ChatWindow/>
        <MemberList/>
      </appContext.Provider>
    </div>
  );
}
