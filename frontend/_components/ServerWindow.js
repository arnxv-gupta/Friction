import { useParams } from "next/navigation";
import ChatWindow from "@/_components/ChatWindow";
import ChannelList from "@/_components/ChannelList";
import MemberList from "@/_components/MemberList";
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
          setData(nData);
        }
      });
    }
  }, [socketData]);

  return (
    <>
      <appContext.Provider value={data}>
        <ChannelList/>
        <ChatWindow/>
        <MemberList/>
      </appContext.Provider>
    </>
  );
}
