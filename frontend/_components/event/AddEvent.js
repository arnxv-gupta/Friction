"use client"

import { useContext, useRef, useState } from "react";
import Dialog from "../ui/Dialog";

import * as Icons from "@mielo-ui/adwaita-symbolic-icons-react"
import { socketContext } from "@/app/layout";
import { useRouter } from "next/navigation";

export default function AddEvent({setVisible, serverID}) {

    const router = useRouter()
    const [name, setName] = useState("")

    const [beginAt, setbeginAt] = useState((new Date).toISOString().slice(0, 16))
    const [endAt, setEndAt] = useState((new Date).toISOString().slice(0, 16));
    const [deadAt, setDeadAt] = useState((new Date).toISOString().slice(0, 16));

    const [location, setLocation] = useState("")

    const {sendMessage} = useContext(socketContext)

    const startRef = useRef(null);
    const endRef = useRef(null);
    const deadRef = useRef(null);

    return (
        <Dialog>
            <div>
            <h3 className="text-lg font-bold flex justify-between items-center mb-4">
                <span>Add event</span>
                <Icons.Actions.ProcessStop className="inline hover:cursor-pointer" onClick={()=>{setVisible(false)}}/>
            </h3>

            <div className="mb-4">
                <label className="block text-sm mb-2">Event Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="# new-event"
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                />
                {!name && <p className="text-red-500 text-sm mt-1">Event name is required.</p>}
            </div>

            <div className="flex gap-x-5">
                <div className="mb-4">
                    <label className="block text-sm mb-2">Begins at</label>
                    <input
                        type="datetime-local"
                        value={beginAt}
                        onChange={(e) => setbeginAt(e.target.value)}
                        ref={startRef}
                        min={(new Date).toISOString().slice(0, 16)}
                        placeholder="# new-event"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                    />
                    {beginAt==0 && <p className="text-red-500 text-sm mt-1">Begin time is required.</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm mb-2">End At</label>
                    <input
                        type="datetime-local"
                        value={endAt}
                        ref={endRef}
                        min={beginAt}
                        onChange={(e) => setEndAt(e.target.value)}
                        placeholder="# new-event"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                    />
                    {endAt==0 && <p className="text-red-500 text-sm mt-1">End time is required.</p>}
                </div>
            </div>

            <div className="mb-4">
                    <label className="block text-sm mb-2">Dead at</label>
                    <input
                        type="datetime-local"
                        value={deadAt}
                        ref={deadRef}
                        max={beginAt}
                        onChange={(e) => setDeadAt(e.target.value)}
                        placeholder="# new-event"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                    />
                    {deadAt==0 && <p className="text-red-500 text-sm mt-1">Dead time is required.</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Location</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="location"
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                />
                {!location && <p className="text-red-500 text-sm mt-1">Location is required.</p>}
            </div>

            </div>

            <button
              className={`w-full bg-[#4C4C4C] px-4 py-2 rounded-b`}
               onClick={()=>{
                
                let startTime = new Date(startRef.current.value);
                let endTime = new Date(endRef.current.value);
                let deadTime = new Date(deadRef.current.value);               

                fetch("http://localhost:3030/createEvent/", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                      name: name,
                      serverID: Number(serverID),
                      organizerID: Number(localStorage.getItem("userID")),
                      startTime: startTime.getTime(),
                      endTime: endTime.getTime(),
                      deadTime: deadTime.getTime(),
                      location: location
                  })
              }).then(res=>res.json()).then(data=>{
                console.log(data);
                
                if(data.type=="SUCCESS") {
                    sendMessage("EVENT ADDED!")
                    router.refresh()
                }
              })
            
              setVisible(false);
              setName("")

                }
            }
            >
              Create
            </button>
        </Dialog>
    )
}