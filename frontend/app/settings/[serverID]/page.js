"use client"

import AddEmoji from "@/_components/emoji/AddEmoji";
import EmojiItem from "@/_components/emoji/EmojiItem";
import AddRole from "@/_components/role/AddRole";
import RoleItem from "@/_components/role/RoleItem";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as Icons from "@mielo-ui/adwaita-symbolic-icons-react"


import { Draggable } from "react-drag-reorder";

export default function Settings() {
    
    let params = useParams();
    let [data, setData] = useState(null);

    let [settingCategory, setSettingCategory] = useState("Overview")

    let [rolesSearch, setRolesSearch] = useState("");
    let [emojiSearch, setEmojiSearch] = useState("");

    let [roleVisible, setRoleVisible] = useState(false);
    let [emojiVisible, setEmojiVisible] = useState(false);

    const roleListRef = useRef(null)


    useEffect(()=>{
        fetch(`http://localhost:3030/serverInfo?serverID=${params.serverID}`).then(res=>res.json()).then(data=>{
            setData(data.res);
        })
    }, [])

    if(data==null) {
        return <div>Loading</div>
    }
    
    console.log(data);
    
    return (
        <div className="flex">
            <div className="w-80 h-screen flex flex-col border-x-2 border-[#d4d4d4] dark:border-[#333] bg-[#F3F3F3] dark:bg-[#2A2A2A]">
                <h3 className="text-2xl p-4 font-semibold">Settings</h3>
                <div className="flex">
                    <ul className="w-80 flex flex-col">
                        <li onClick={(e)=>{setSettingCategory(e.target.innerText)}} className="px-3 py-2 m-2 hover:bg-[#E4E4E4] dark:hover:bg-[#484747] cursor-pointer rounded flex items-center"><Icons.Status.UserAvailable className="icon inline mr-1"/> Overview</li>
                        <li onClick={(e)=>{setSettingCategory(e.target.innerText)}} className="px-3 py-2 m-2 hover:bg-[#E4E4E4] dark:hover:bg-[#484747] cursor-pointer rounded flex items-center"><Icons.Emotes.FaceCool className="icon inline mr-1"/> Emojis</li>
                        <li onClick={(e)=>{setSettingCategory(e.target.innerText)}} className="px-3 py-2 m-2 hover:bg-[#E4E4E4] dark:hover:bg-[#484747] cursor-pointer rounded flex items-center"><Icons.Status.AvatarDefault className="icon inline mr-1" />Members</li>
                    </ul>
                    <div>
                        {}
                    </div>
                </div>
            </div>
            <div className="bg-[#FAFAFA] dark:bg-[#2C2C2C] flex-1 p-6">
                <Link href={`/chat/${params.serverID}`} className="flex justify-between pb-6">
                    <h5 className="text-xl">{settingCategory}</h5>
                    <span  className="bg-[#EAEAEA] dark:bg-[#404040] p-3 rounded-full flex items-center justify-center"><Icons.Actions.ProcessStop className="inline"/></span>
                </Link>

                {settingCategory=="Overview"?(
                    <div className="p-3">
                        <div className="flex">
                            <img
                                src={data?.serverIcon}
                                className="size-36 rounded-lg"
                                alt="Icon"
                            />
                            <div className="p-3 pt-0">
                                <label htmlFor="serverName" className="mb-2 block text-sm font-medium">Name</label>
                                <input 
                                    type="text" 
                                    id="serverName" 
                                    value={data?.name} 
                                    className="w-full block border-none py-2 px-4 rounded placeholder-black focus:outline-[#1c71d8] dark:focus:outline-[#78aeed] bg-[#EAEAEA] dark:bg-[#404040] dark:text-white dark:placeholder-gray-400 focus:outline-none transition duration-200"
                                />
                                <span className="mt-2 block text-[#888]">Server ID: {data?.serverID}</span>
                                <span className="text-[#888] block">Admin ID: {data?.adminID}</span>
                                <span className="text-[#888]">Created at: {new Date(data?.createdAt).toDateString()}</span>
                            </div>
                        </div>

                        <div className="bg-red-500 p-3 rounded inline-block">
                            <h3 className="flex items-center"><Icons.Status.UserTrashFull className="inline mr-1"/>Delete server</h3>
                            <span className="text-sm text-red-300">Are the sure you want to delete the server. Action can't be undone!</span>
                        </div>
                    </div>
                ):settingCategory=="Roles"?(
                    <div className="p-3">
                        <div className="flex">
                        <input 
                        type="text"
                        onChange={(e)=>{
                            setRolesSearch(e.target.value)
                        }} 
                        placeholder="Search Roles" 
                        className="w-full px-4 py-3 bg-[#1E1F22] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button onClick={()=>{
                            //setRoleVisible(true)
                            console.log(roleListRef.current.children[0].innerText);
                            
                        }}>Create role</button>
                        </div>
                        <ul ref={roleListRef} className="text-left mt-5 divide-y-2 w-full p-4 divide-[#888]">
                            <Draggable>
                            {data.roles.filter((el)=>el.name.includes(rolesSearch)).map((el)=>{
                                return <RoleItem name={el.name} count={el.assignedTo.length} serverID={data.serverID}/>
                            })}
                            </Draggable>
                        </ul>

                        {roleVisible?<AddRole setVisible={setRoleVisible} membersList={data.membersList} serverID={data.serverID}/>:null}
                    </div>
                ):settingCategory=="Emojis"?(
                    <div className="p-3">
                        <div className="flex">
                        <input 
                        type="text"
                        onChange={(e)=>{
                            setEmojiSearch(e.target.value)
                        }} 
                        placeholder="Search Emojis" 
                        className="flex-grow block border-none py-2 px-4 rounded placeholder-black focus:outline-[#1c71d8] dark:focus:outline-[#78aeed] bg-[#EAEAEA] dark:bg-[#404040] dark:text-white dark:placeholder-gray-400 focus:outline-none transition duration-200"
                        />
                        <button
                            className="mx-2 bg-[#51956d] text-[#fff] px-4 py-2 rounded cursor-pointer hover:underline"
                            onClick={()=>[
                                setEmojiVisible(true)
                            ]}  
                        ><Icons.Actions.ListAdd className="icons" /></button>
                        </div>

                        <table className="w-full text-left mt-3">
                            <thead>
                                <tr className="border-b-2 border-[#d4d4d4] dark:border-[#333] bg-[#F3F3F3] dark:bg-[#2A2A2A] shadow-sm ">
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>EmojiID</th>
                                </tr>
                            </thead>
                            <tbody>                            {data.emojis.filter(el=>el.name.includes(emojiSearch)).map((el)=>{
                                return <EmojiItem name={el.name} src={el.src} emojiID={el.emojiID} serverID={data.serverID}/>
                            })}
                            </tbody>

                        </table>

                        {emojiVisible?<AddEmoji setVisible={setEmojiVisible} serverID={data.serverID}/>:null}
                    </div>
                ):null}
            </div>
        </div>
    )
}