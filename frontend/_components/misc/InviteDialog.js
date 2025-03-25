import Dialog from "../ui/Dialog";

import { FaXmark } from "react-icons/fa6";

export default function InviteDialog({setVisible}) {
    return (
        <Dialog>
            <h3 className="text-lg font-bold text-center flex justify-between items-center mb-4">
                <span className="flex-1">Invite People</span>
                <FaXmark className="hover:text-[#888] cursor-pointer" onClick={()=>{setVisible(true)}} />
            </h3>

            <div className="mb-4">
                {/* <input
                    type="text"
                    value={`http://localhost:3000/join/${serverID}`}
                    readOnly={true}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                /> */}
            </div>
        </Dialog>
    )
}