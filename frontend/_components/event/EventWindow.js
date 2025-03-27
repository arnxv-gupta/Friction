"use client"

import AddEvent from "./AddEvent";
import { useContext, useState } from "react";
import { appContext } from "../server/ServerWindow";

export default function EventWindow() {
    const [isEventOpen, setEventOpen] = useState(false);
    const [name, setName] = useState("")

    const data = useContext(appContext);
    
    return (
        <>
        <div className="bg-[#FAFAFA] dark:bg-[#2C2C2C] w-full p-4">
            <h3>Events</h3>
            <div className="flex m-3">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="# new-event"
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                    />
                    <button onClick={()=>{
                        setEventOpen(true)
                    }}>Create event</button> 
            </div>
            <ul>
                {}
            </ul>
        </div>
        {isEventOpen?<AddEvent setVisible={setEventOpen} serverID={data.serverID}/>:null}
        </>
    )
}