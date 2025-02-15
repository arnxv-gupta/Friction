"use client";
import { useContext, useState } from "react";
import ChannelItem from "./ChannelItem";
import ServerDropDown from "./ServerDropDown";
import UserProfile from "./User";
import { appContext } from "./ServerWindow";
import CategoryItem from "./CategoryItem";

const ChannelList = () => {
  const data = useContext(appContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  if (!data) return null;
  console.log(data);
  

  return (
    <div className="w-64 h-screen flex flex-col bg-[#2B2D31]">
      {/* Server Dropdown */}
      <div className="relative mb-3">
        <button
          onClick={toggleDropdown}
          className="text-lg font-bold text-white flex justify-between items-center w-full bg-[#414244] px-4 py-2"
        >
          <span>{data.name}</span>
          <span className="text-gray-400 text-lg">
            {isDropdownOpen ? '×' : '▼'}
          </span>
          {isDropdownOpen && <ServerDropDown serverID={data.serverID} />}
        </button>
      </div>

      {/* Channels List */}
      <div className="mb-6">
        {data.categories.length > 0 && (
          <ul>
            {data.categories.map((el, i) => {
              return (
                <>
                <CategoryItem name={el.name} channels={data.channels.filter((channel)=>(channel.categoryID==el.categoryID))}>

              </CategoryItem>
                </>
              )
            })}
          </ul>
        )}
      </div>

      {/* User Profile Section */}
      <UserProfile user={{ name: data.userName, picture: data.userPicture }} />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .truncate {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
};

export default ChannelList;
