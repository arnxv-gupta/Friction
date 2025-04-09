"use client"
import { useState } from "react";

import Link from "next/link";
import InviteDialog from "../misc/InviteDialog";

import * as Icons from "@mielo-ui/adwaita-symbolic-icons-react"
import { useRouter } from "next/navigation";


export default function ServerDropDown({serverID, adminID, channelDialog, categoryDialog}) {
  let [isInviteOpen, setInviteOpen] = useState(false);
  let router = useRouter()

  return (
    <>
      <ul className="absolute top-full left-0 w-full bg-[#E4E4E4] dark:bg-[#2C2C2C] text-sm z-100">
        <li
        className="px-4 py-2 rounded my-2 flex items-center hover:bg-[#E4E4E4] dark:hover:bg-[#484747]  mx-1"
        onClick={()=>{
          setInviteOpen(true);
        }}
        >
          {/* NOT WORKING */}
        <span className="flex items-center"><Icons.Actions.ContactNew className="inline mr-1"/> Invite People</span>
        </li>
        {adminID==localStorage.getItem("userID") && <Link
        href={`/settings/${serverID}`}
        className="px-4 py-2 rounded my-2 flex items-center hover:bg-[#E4E4E4] dark:hover:bg-[#484747]  mx-1"
        >
        <span className="flex items-center"><Icons.Categories.ApplicationsSystem className="inline mr-1"/> Server Setting</span>
        </Link>}
        {adminID==localStorage.getItem("userID") && <li
        className="px-4 py-2 rounded my-2 flex items-center hover:bg-[#E4E4E4] dark:hover:bg-[#484747]  mx-1"
        onClick={()=>{
          categoryDialog(true);
        }}
        >
        <span className="flex items-center"><Icons.Actions.FolderNew className="inline mr-1"/> Create Category</span>
        </li>}
        {adminID==localStorage.getItem("userID") && <li
        className="px-4 py-2 rounded my-2 flex items-center hover:bg-[#E4E4E4] dark:hover:bg-[#484747]  mx-1"
        onClick={()=>{
          channelDialog(true)
        }}
        >
        <span className="flex items-center"><Icons.Actions.DocumentNew className="inline mr-1"/> Create Channel</span>
        </li>}
        {adminID!=localStorage.getItem("userID") && <li
        className="px-4 py-2 rounded my-2 flex items-center hover:bg-[#E4E4E4] dark:hover:bg-[#484747]  mx-1"
        onClick={()=>{
          fetch(`http://localhost:3030/leaveServer?userID=${localStorage.getItem("userID")}&serverID=${serverID}`).then(res=>res.json()).then(data=>{
            console.log(data);
            if(data.type=="SUCCESS") {
              router.push("/chat/@me")
            }
          })
        }}
        >
        <span className="flex items-center"><Icons.Actions.SystemLogOut className="inline mr-1" /> Leave Server</span>
        </li>}
      </ul>
      {isInviteOpen?<InviteDialog setVisible={setInviteOpen} />:null}
    </>
  );
}
