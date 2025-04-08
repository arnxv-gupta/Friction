"use client"

import AddEvent from "./AddEvent";
import { useContext, useState } from "react";
import { appContext } from "../server/ServerWindow";
import EventItem from "./EventItem";

export default function EventWindow() {
    const [isEventOpen, setEventOpen] = useState(false);
    const [name, setName] = useState("")

    const data = useContext(appContext);
    console.log(data);
    
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
            <ul className="mr-16 flex flex-col-reverse max-h-[80lvh] overflow-y-scroll p-2 ">
                {data && data.events.map(el=>(
                    <EventItem name={el.name} deadTime={el.deadTime} startTime={el.startTime} endTime={el.endTime} organizerID={el.organizerID} participants={el.participants} serverID={data.serverID} eventID={el.eventID} location={el.location}/>
                ))}
            </ul>
        </div>
        {isEventOpen&&data?.serverID?<AddEvent setVisible={setEventOpen} serverID={data.serverID}/>:null}
        </>
    )
}