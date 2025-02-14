import { useRouter } from "next/navigation";
import ServerDropItem from "./ServerDropItem";
import { socketContext } from '@/app/layout';
import { useContext } from "react";

export default function ServerDropDown({serverID}) {
  let router = useRouter()
  let {socketData, sendMessage} = useContext(socketContext)

  console.log(122, serverID);
  

  return (
    <ul className="absolute top-full left-0 w-full bg-[#2B2D31] rounded-lg text-white text-sm z-10">
      <ServerDropItem label="Invite people" call={()=>{}} />
      <ServerDropItem label="Server settings" call={()=>{}} />
      <ServerDropItem label="Leave server" call={()=>{}} />
        <ServerDropItem label="Create channel" call={()=>{
            fetch("http://localhost:3030/createChannel/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: "default",
                    type: "text",
                    serverID: Number(serverID)
                })
            }).then(res=>res.json()).then(data=>{
              console.log(data);
              
              if(data.type=="SUCCESS") {
                  sendMessage("CHANNEL ADDED!")
                  router.refresh()
              }
            })
        }}/>
    </ul>
  );
}
