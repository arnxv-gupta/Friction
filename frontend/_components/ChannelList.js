"use client";
import { useContext, useState } from "react";
import ChannelItem from "./ChannelItem";
import ServerDropDown from "./ServerDropDown";
import UserProfile from "./User";
import { appContext } from "./ServerWindow";
import CategoryItem from "./CategoryItem";
import AddChannel from "./AddChannel";
import Link from "next/link";
import { Icon } from "@iconify/react";

const ChannelList = () => {
  const data = useContext(appContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  if (!data) return null;
  // console.log(data);
  

  return (
    <div className="w-64 h-screen flex flex-col bg-[#1d1f24] rounded-tl-2xl">
      {/* Server Dropdown */}
      <div className="relative mb-3">
        <button
          onClick={toggleDropdown}
          className="text-lg font-bold flex justify-between rounded-tl-2xl items-center w-full bg-[#333643] px-4 py-2"
        >
          <span>{data.name}</span>
          <span className="text-gray-400 text-lg">
            {isDropdownOpen ? '×' : '▼'}
          </span>
          {isDropdownOpen && <ServerDropDown />}
        </button>
      </div>

      {/* Channels List */}
      <div className="mb-6">
        {data.categories.length > 0 && (
          <ul>
            {/* Events btn */}
            <li className="p-3 hover:cursor-pointer hover:bg-[#2E3035] m-1 rounded">
              <Link href={`/events/${data.serverID}`}>
              <Icon icon="tabler:calendar-event" className="inline h-4"/>
              Events
              </Link>
            </li>
            <li className="p-3 hover:cursor-pointer hover:bg-[#2E3035] m-1 rounded">
              <Link href={`/annoucements/${data.serverID}`}>
              <Icon icon="tabler:speakerphone" className="inline h-4"/>
              Annoucements
              </Link>
            </li>
            {data.categories.map((el, i) => {
              return (
                <CategoryItem name={el.name} channels={data.channels.filter((channel)=>(channel.categoryID==el.categoryID))} showDialog={()=>{
                  setDialogOpen(true)
                  setSelectedCategory(el.categoryID)
                }}/>
              )
            })}
          </ul>
        )}
      </div>

      {/* User Profile Section
      <UserProfile user={{ name: data.userName, picture: data.userPicture }} /> */}
      {isDialogOpen?<AddChannel isVisible={isDialogOpen} categoryID={selectedCategory} setVisible={setDialogOpen} />:null}
      
    </div>
  );
};

export default ChannelList;
