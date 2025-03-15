"use client";

import { memo, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import ServerDialogue from "../misc/ServerDialogue";
import Link from "next/link";
import Image from "next/image"; 
import ServerItem from "./ServerItem";


const ServerList = memo(() => {
  const [isDialog, setIsDialog] = useState(false);
  const [servers, setServers] = useState([]);

  useEffect(() => {
      fetch(`http://localhost:3030/userInfo?userID=${localStorage.getItem("userID")}`).then((res) => res.json()).then(async (data) => {
          setServers(await data.res.joinedServers);
        });

  }, []);

  return (
    <>
      {isDialog && <ServerDialogue />}

      <ul className="p-3 h-screen flex flex-col items-center space-y-1"> 
        <li className="w-12 h-12 my-2">
            <Link href="/channels/@me">
                <img
                src="/image.png"
                width={48}
                height={48}
                className="object-contain opacity-100 transition rounded-full hover:rounded-sm" 
            />
            </Link>
        </li>
        <hr className="w-10/12  border-gray-600" />

        <ul className="w-full flex flex-col items-center space-y-2">
          {servers.length > 0  &&
            servers.map((id) => (
              <ServerItem id={id} link={`/channels/${id}`} key={id} />
            ))}
        </ul>

        <div
          className="bg-[#333643] size-12 flex items-center justify-center rounded-full cursor-pointer transform hover:bg-gray-600 hover:scale-110"
          onClick={() => {
            setIsDialog(true);
          }}
        >
          <FaPlus />
        </div>
      </ul>
    </>
  );
});

export default ServerList;
