"use client"
import { useState } from "react";

import { FaUserPlus, FaGear, FaFolderOpen, FaSquarePlus, FaDoorOpen } from "react-icons/fa6";
import Link from "next/link";
import InviteDialog from "../misc/InviteDialog";

import * as Icons from "@mielo-ui/adwaita-symbolic-icons-react"


export default function ServerDropDown({serverID, channelDialog, categoryDialog}) {
  let [isInviteOpen, setInviteOpen] = useState(false);

  return (
    <>
      <ul className="absolute top-full left-0 w-full bg-[#E4E4E4] text-sm z-100">
        <li
        className="px-4 py-2 rounded my-2 flex items-center hover:bg-[#E4E4E4]  mx-1"
        onClick={()=>{
          setInviteOpen(true);
        }}
        >
          {/* NOT WORKING */}
        <span className="flex items-center"><Icons.Actions.ContactNew className="inline mr-1"/> Invite People</span>
        </li>
        <Link
        href={`/settings/${serverID}`}
        className="px-4 py-2 rounded my-2 flex items-center hover:bg-[#E4E4E4]  mx-1"
        >
        <span className="flex items-center"><Icons.Categories.ApplicationsSystem className="inline mr-1"/> Server Setting</span>
        </Link>
        <li
        className="px-4 py-2 rounded my-2 flex items-center hover:bg-[#E4E4E4]  mx-1"
        onClick={()=>{
          categoryDialog(true);
        }}
        >
        <span className="flex items-center"><Icons.Actions.FolderNew className="inline mr-1"/> Create Category</span>
        </li>
        <li
        className="px-4 py-2 rounded my-2 flex items-center hover:bg-[#E4E4E4]  mx-1"
        onClick={()=>{
          channelDialog(true)
        }}
        >
        <span className="flex items-center"><Icons.Actions.DocumentNew className="inline mr-1"/> Create Channel</span>
        </li>
        <li
        className="px-4 py-2 rounded my-2 flex items-center hover:bg-[#E4E4E4]  mx-1"
        >
        <span className="flex items-center"><Icons.Actions.SystemLogOut className="inline mr-1" /> Leave Server</span>
        </li>
      </ul>
      {isInviteOpen?<InviteDialog setVisible={setInviteOpen} />:null}
    </>
  );
}
