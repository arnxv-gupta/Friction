"use client"

import { useParams } from "next/navigation"
import AddEvent from "./AddEvent";
import { useState } from "react";

export default function EventWindow() {
    const {serverID} = useParams();

    const [isEventOpen, setEventOpen] = useState(true);

    return (
        <>
        <div className="flex flex-col bg-[#202329] w-full">
            
        </div>
        {isEventOpen?<AddEvent setVisible={setEventOpen}/>:null}
        </>
    )
}