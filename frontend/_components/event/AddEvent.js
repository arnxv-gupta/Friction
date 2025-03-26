"use client"

import { useContext, useRef, useState } from "react";
import Dialog from "../ui/Dialog";

import { FaXmark } from "react-icons/fa6";
import { socketContext } from "@/app/layout";
import { useRouter } from "next/navigation";

export default function AddEvent({setVisible, serverID}) {

    const router = useRouter()

    const [name, setName] = useState("")
    const [beginAt, setbeginAt] = useState(0)
    const [registrationTill, setRegistrationTill] = useState(0);

    const {sendMessage} = useContext(socketContext)

    const startRef = useRef(null);
    const deadlineRef = useRef(null);

    return (
        <Dialog>
            <h3 className="text-lg font-bold flex justify-between items-center mb-4">
                <span>Add event</span>
                <FaXmark className="hover:text-[#888] cursor-pointer" onClick={()=>{setVisible(false)}} />
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

            <div className="mb-4">
                <label className="block text-sm mb-2">Begins at</label>
                <input
                    type="datetime-local"
                    value={beginAt}
                    onChange={(e) => setbeginAt(e.target.value)}
                    ref={startRef}
                    placeholder="# new-event"
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                />
                {beginAt==0 && <p className="text-red-500 text-sm mt-1">Begin time is required.</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Registeration till</label>
                <input
                    type="datetime-local"
                    value={registrationTill}
                    ref={deadlineRef}
                    onChange={(e) => setRegistrationTill(e.target.value)}
                    placeholder="# new-event"
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                />
                {registrationTill==0 && <p className="text-red-500 text-sm mt-1">Registration time is required.</p>}
            </div>

            <button
              className={`${
                name
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-500 cursor-not-allowed"
              } px-4 py-2 rounded`}
               onClick={()=>{
                
                let startTime = new Date(startRef.current.value);
                let deadlineTime = new Date(deadlineRef.current.value);

                console.log(startTime, deadlineTime);
                

                fetch("http://localhost:3030/createEvent/", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                      name: name,
                      banner: "!23",
                      serverID: Number(serverID),
                      organizerID: Number(localStorage.getItem("userID")),
                      startTime: startTime.getTime(),
                      registrationDeadline: deadlineTime.getTime()
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