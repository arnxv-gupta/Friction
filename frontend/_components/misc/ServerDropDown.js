import { useContext } from "react";
import ServerDropItem from "./ServerDropItem";
import { appContext } from "../server/ServerWindow";
import { socketContext } from "@/app/layout";

export default function ServerDropDown() {
  const data = useContext(appContext);
  let {socketData, sendMessage} = useContext(socketContext);

  return (
    <ul className="absolute top-full left-0 w-full bg-[#2B2D31] rounded-lg text-white text-sm z-100">
      <ServerDropItem label="Invite people" call={()=>{}} />
      <ServerDropItem label="Server settings" call={()=>{}} />
      <ServerDropItem label="Create category" call={()=>{
         fetch("http://localhost:3030/createCategory/", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              name: "catgory-name",
              serverID: Number(data.serverID)
          })
      }).then(res=>res.json()).then(data=>{
        console.log(data);
        
        if(data.type=="SUCCESS") {
            sendMessage("CHANNEL ADDED!");
        }
      })
      }} />
      <ServerDropItem label="Leave server" call={()=>{}} />
    </ul>
  );
}
