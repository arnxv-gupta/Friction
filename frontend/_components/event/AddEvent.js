import { useState } from "react";
import Dialog from "../ui/Dialog";

import { FaXmark } from "react-icons/fa6";

export default function AddEvent({setVisible}) {

    const [name, setName] = useState("")
    const [beginAt, setbeginAt] = useState(0)
    const [registrationTill, setRegistrationTill] = useState(0);

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
                    onChange={(e) => setRegistrationTill(e.target.value)}
                    placeholder="# new-event"
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                />
                {registrationTill==0 && <p className="text-red-500 text-sm mt-1">Registration time is required.</p>}
            </div>

        </Dialog>
    )
}