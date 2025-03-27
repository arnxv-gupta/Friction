"use client";
import { useContext, useState } from "react";
import { appContext } from "../server/ServerWindow";
import Link from "next/link";

import DropDown from "../ui/DropDown";
import CategoryItem from "../category/CategoryItem";
import AddChannel from "./AddChannel";

import * as Icons from "@mielo-ui/adwaita-symbolic-icons-react"
import AddCategory from "../category/AddCatgory";
import Profile from "./Profile";

const ChannelList = () => {
  const data = useContext(appContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isChannelOpen, setChannelOpen] = useState(false);
  const [isCategoryOpen, setCategoryOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(0);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  if (!data) return null;

  return (
    <div className="w-80 h-screen flex flex-col justify-between border-x-2 border-[#d4d4d4] dark:border-[#333] bg-[#F3F3F3] dark:bg-[#2A2A2A]">
      {/* Server Dropdown */}
      <div>
      <div className="relative mb-3">
        <button
          onClick={toggleDropdown}
          className="text-lg font-bold flex justify-between items-center w-full border-b-2 border-[#d4d4d4] dark:border-[#333] bg-[#F3F3F3] dark:bg-[#2A2A2A] shadow-sm px-4 py-2"
        >
          <span>{data.name}</span>
          <span className="text-lg">
            {isDropdownOpen ? <Icons.Actions.ProcessStop /> : <Icons.Actions.OpenMenu className="icons" />}
          </span>
          {isDropdownOpen && <DropDown serverID={data.serverID} channelDialog={setChannelOpen} categoryDialog={setCategoryOpen}/>}
        </button>
      </div>

      {/* Channels List */}
      <div className="mb-6">
        {data.categories.length > 0 && (
          <ul>
            {/* Events btn */}
            <li className="p-3 hover:cursor-pointer hover:bg-[#E4E4E4] mx-2 my-1 rounded">
              <Link href={`/events/${data.serverID}`} className="flex items-center">
                Events
              </Link>
            </li>
            <li className="p-3 hover:cursor-pointer hover:bg-[#E4E4E4] mx-2 my-1 rounded">
              <Link href={`/stage/${data.serverID}`} className="flex items-center">
              Stage
              </Link>
            </li>
            {data.categories.map((el) => {
              return (
                <CategoryItem key={el.categoryID} name={el.name} channels={data.channels.filter((channel)=>(channel.categoryID==el.categoryID))} showDialog={()=>{
                  setChannelOpen(true)
                  setSelectedCategory(el.categoryID)
                }}/>
              )
            })}
          </ul>
        )}
      </div>
      </div>

      <div className="flex">
        <Profile userID={Number(localStorage.getItem("userID"))} />
      </div>

      {isChannelOpen?<AddChannel isVisible={isChannelOpen} categoryID={selectedCategory} setVisible={setChannelOpen} />:null}
      {isCategoryOpen?<AddCategory isVisible={isCategoryOpen} setVisible={setCategoryOpen} />:null}

      
    </div>
  );
};

export default ChannelList;
