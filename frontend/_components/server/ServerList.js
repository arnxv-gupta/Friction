"use client";

import { memo, useEffect, useState } from "react";
import * as Icons from "@mielo-ui/adwaita-symbolic-icons-react"

import AddServer from "./AddServer";
import Link from "next/link";
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
      {isDialog && <AddServer setVisible={setIsDialog}/>}

      <ul className="p-3 h-screen flex flex-col items-center space-y-1"> 
      <Link href="/inbox/@me" className="bg-[#FAFAFA] text-[#51956d] dark:bg-[#2A2A2A] size-12 flex items-center justify-center rounded-full cursor-pointer transform hover:bg-gray-600 mb-3 hover:scale-110">
          <Icons.Status.UserAvailable />
        </Link>
        <hr className="w-10/12  border-gray-600" />

        <ul className="w-full flex flex-col items-center space-y-2">
          {servers.length > 0  &&
            servers.map((id) => (
              <ServerItem id={id} link={`/chat/${id}`} key={id} />
            ))}
        </ul>

        <div
          className="bg-[#FAFAFA] text-[#51956d] dark:bg-[#2A2A2A] size-12 flex items-center justify-center rounded-full cursor-pointer transform hover:bg-gray-600 hover:scale-110"
          onClick={() => {
            setIsDialog(true);
          }}
        >
          <Icons.Actions.ListAdd />
        </div>
      </ul>
    </>
  );
});

export default ServerList;
