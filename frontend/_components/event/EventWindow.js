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
        <div className="flex flex-col bg-[#FAFAFA] dark:bg-[#2C2C2C] max-h-screen w-full">
            <div className="text-lg justify-between items-center font-bold mb-4 px-4 py-2 border-b-2 border-[#d4d4d4] dark:border-[#333]">
                  Events
             </div>
            <div className="flex m-3">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="# new-event"
                    className="flex-grow block border-none py-2 px-4 rounded placeholder-black focus:outline-[#1c71d8] dark:focus:outline-[#78aeed] bg-[#404040] dark:text-white dark:placeholder-gray-400 focus:outline-none transition duration-200"
                    />

                   {data?.adminID==localStorage.getItem("userID") && <button
                    className="bg-[#51956d] text-[#fff] mx-2 px-4 py-2 rounded cursor-pointer hover:underline"
                    onClick={()=>{
                        setEventOpen(true)
                    }}>Create</button>} 
            </div>
            <ul className="mr-16 flex flex-col-reverse max-h-[80lvh] overflow-y-scroll p-2 ">
                {data && data.events.filter((el)=>el.name.includes(name)).map(el=>(
                    <EventItem name={el.name} desc={el?.desc} startTime={el.startTime} endTime={el.endTime} organizerID={el.organizerID} participants={el.participants} serverID={data.serverID} eventID={el.eventID} location={el.location}/>
                ))}
            </ul>
        </div>
        {isEventOpen&&data?.serverID?<AddEvent setVisible={setEventOpen} serverID={data.serverID}/>:null}
        </>
    )
}