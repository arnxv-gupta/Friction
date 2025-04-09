"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FriendItem({userID}) {
    // add pfp
    const [data, setData] = useState({});

    useEffect(()=>{
        fetch(`http://localhost:3030/userInfo?userID=${userID}`).then(res=>res.json()).then(data=>{
            setData(data.res);
        })
    }, [])
    return (
        <li key={userID} className="px-3 py-2 hover:bg-[#35373C] block rounded-md">
            <Link href={`/inbox/${userID}`} className="flex items-center">
            <img
            src={data.pfpURL}
            className="rounded-full size-9 mr-3 mt-1"
            />
            {data.username}
            </Link>
        </li>
    )
}