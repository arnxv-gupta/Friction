import { useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { appContext } from "../server/ServerWindow";
import { socketContext } from '@/app/layout';

import * as Icons from "@mielo-ui/adwaita-symbolic-icons-react"

import Dialog from "../ui/Dialog";

export default function AddChannel({isVisible, categoryID, setVisible}) {
  const [isPrivate, setIsPrivate] = useState(false);
  const [channelType, setChannelType] = useState("text");
  const [channelName, setChannelName] = useState("");

  const data = useContext(appContext);
  let router = useRouter()
  let {sendMessage} = useContext(socketContext);

  if(isVisible==false)
    return;


  const RadioOption = ({ type, label }) => (
    <label
      className={`flex items-center space-x-2 cursor-pointer p-2 rounded ${
        channelType === type ? "bg-gray-700" : ""
      }`}
    >
      <input
        type="radio"
        name="channelType"
        checked={channelType === type}
        onChange={() => {
          setChannelType(type)         
        }}
        className="hidden"
      />
      <span>{label}</span>
    </label>
  );

  return (
    <Dialog>
        <h3 className="text-lg font-bold flex justify-between items-center mb-4">
              <span>Add channel</span>
              <Icons.Actions.ProcessStop className="cursor-pointer" onClick={()=>{setVisible(false)}}/>
        </h3>

        <div className="mb-4">
          <label className="block text-sm mb-2">Channel Type</label>
          <div className="flex items-center space-x-4">
            <RadioOption type="text" label="📄 Text"/>
            <RadioOption type="voice" label="🎤 Voice"/>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2">Channel Name</label>
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="# new-channel"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
          />
          {!channelName && <p className="text-red-500 text-sm mt-1">Channel name is required.</p>}
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={() => setIsPrivate(!isPrivate)}
            id="privateChannel"
            className="w-5 h-5 accent-blue-500 cursor-pointer"
          />
          <label htmlFor="privateChannel" className="ml-2 cursor-pointer">
            Private Channel
          </label>
        </div>

        {isPrivate && (
          <p className="text-gray-400 text-sm">
            Only selected members and roles will be able to view this channel.
          </p>
        )}

        <div className="mt-6 flex justify-end">
          <button onClick={()=>[
            setVisible(false)
          ]}
           className="bg-[#4C4C4C] hover:underline cursor-pointer w-full text-[#fff] px-4 py-2 rounded mr-2">
            Cancel
          </button>

            <button
              disabled={!channelName}
              className={`bg-[#51956d] text-[#fff] w-full px-4 py-2 rounded cursor-pointer hover:underline`}
               onClick={()=>{
                fetch("http://localhost:3030/createChannel/", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                      name: channelName,
                      type: channelType,
                      categoryID: Number(categoryID),
                      serverID: Number(data.serverID)
                  })
              }).then(res=>res.json()).then(data=>{
                console.log(data);
                
                if(data.type=="SUCCESS") {
                    sendMessage("CHANNEL ADDED!")
                    router.refresh()
                }
              })
            
              setVisible(false);
              setChannelName("");

               }}
            >
              Create
            </button>

        </div>
    </Dialog>
  );
}
