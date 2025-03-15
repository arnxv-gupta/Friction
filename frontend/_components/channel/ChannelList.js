"use client";
import { useContext, useState } from "react";
import { appContext } from "../server/ServerWindow";
import Link from "next/link";

import DropDown from "../ui/DropDown";
import CategoryItem from "../category/CategoryItem";
import AddChannel from "./AddChannel";

import { FaXmark } from "react-icons/fa6";
import { FaBullhorn, FaCalendar, FaAngleDown} from "react-icons/fa";
import AddCategory from "../category/AddCatgory";

const ChannelList = () => {
  const data = useContext(appContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isChannelOpen, setChannelOpen] = useState(false);
  const [isCategoryOpen, setCategoryOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(0);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  if (!data) return null;

  return (
    <div className="w-80 h-screen flex flex-col bg-[#1d1f24] rounded-tl-2xl">
      {/* Server Dropdown */}
      <div className="relative mb-3">
        <button
          onClick={toggleDropdown}
          className="text-lg font-bold flex justify-between rounded-tl-2xl items-center w-full bg-[#333643] px-4 py-2"
        >
          <span>{data.name}</span>
          <span className="text-gray-400 text-lg">
            {isDropdownOpen ? <FaXmark /> : <FaAngleDown />}
          </span>
          {isDropdownOpen && <DropDown serverID={data.serverID} channelDialog={setChannelOpen} categoryDialog={setCategoryOpen}/>}
        </button>
      </div>

      {/* Channels List */}
      <div className="mb-6">
        {data.categories.length > 0 && (
          <ul>
            {/* Events btn */}
            <li className="p-3 hover:cursor-pointer hover:bg-[#2E3035] m-2 rounded">
              <Link href={`/events/${data.serverID}`} className="flex items-center">
              <FaCalendar className="inline mr-1" />
                Events
              </Link>
            </li>
            <li className="p-3 hover:cursor-pointer hover:bg-[#2E3035] m-2 rounded">
              <Link href={`/annoucements/${data.serverID}`} className="flex items-center">
              <FaBullhorn className="inline mr-1" />
              Annoucements
              </Link>
            </li>
            {data.categories.map((el, i) => {
              return (
                <CategoryItem name={el.name} channels={data.channels.filter((channel)=>(channel.categoryID==el.categoryID))} showDialog={()=>{
                  setChannelOpen(true)
                  setSelectedCategory(el.categoryID)
                }}/>
              )
            })}
          </ul>
        )}
      </div>

      {/* User Profile Section
      <UserProfile user={{ name: data.userName, picture: data.userPicture }} /> */}
      {isChannelOpen?<AddChannel isVisible={isChannelOpen} categoryID={selectedCategory} setVisible={setChannelOpen} />:null}
      {isCategoryOpen?<AddCategory isVisible={isCategoryOpen} setVisible={setCategoryOpen} />:null}

      
    </div>
  );
};

export default ChannelList;
