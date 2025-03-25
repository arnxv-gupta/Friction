"use client"
import { useContext, useState } from "react";

import { appContext } from "../server/ServerWindow";

import { FaUserPlus, FaGear, FaFolderOpen, FaSquarePlus, FaDoorOpen } from "react-icons/fa6";
import Link from "next/link";
import InviteDialog from "../misc/InviteDialog";

export default function ServerDropDown({serverID, channelDialog, categoryDialog}) {
  const data = useContext(appContext);

  let [isInviteOpen, setInviteOpen] = useState(false);

  console.log(isInviteOpen);
  

  return (
    <>
      <ul className="absolute top-full left-0 w-full bg-[#2B2D31] text-white text-sm z-100">
        <li
        className="px-4 py-2 rounded my-2 flex items-center hover:bg-[#333643] mx-1"
        onClick={()=>{
          setInviteOpen(true);
        }}
        >
          {/* NOT WORKING */}
        <span className="flex items-center"><FaUserPlus className="inline mr-1"/> Invite People</span>
        </li>
        <Link
        href={`/settings/${serverID}`}
        className="px-4 py-2 rounded my-2 flex items-center hover:bg-[#333643] mx-1"
        >
        <span className="flex items-center"><FaGear className="inline mr-1"/> Server Setting</span>
        </Link>
        <li
        className="px-4 py-2 rounded my-2 flex items-center hover:bg-[#333643] mx-1"
        onClick={()=>{
          categoryDialog(true);
        }}
        >
        <span className="flex items-center"><FaFolderOpen className="inline mr-1"/> Create Category</span>
        </li>
        <li
        className="px-4 py-2 rounded my-2 flex items-center hover:bg-[#333643] mx-1"
        onClick={()=>{
          channelDialog(true)
        }}
        >
        <span className="flex items-center"><FaSquarePlus className="inline mr-1"/> Create Channel</span>
        </li>
        <li
        className="px-4 py-2 rounded my-2 flex items-center hover:bg-[#333643] mx-1"
        >
        <span className="flex items-center"><FaDoorOpen className="inline mr-1" /> Leave Server</span>
        </li>
      </ul>
      {isInviteOpen?<InviteDialog setVisible={setInviteOpen} />:null}
    </>
  );
}
