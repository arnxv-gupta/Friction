import { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";

import FriendItem from "./FriendItem";

export default function FriendsList() {

    const [data, setData] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:3030/userInfo?userID=${localStorage.getItem("userID")}`)
        .then((res) => res.json())
        .then(async (data) => {
            setData(data.res);
        })
    }, []);

    return (
        <div className="w-64 p-4 h-screen flex flex-col border-x-2 border-[#d4d4d4] dark:border-[#333] bg-[#F3F3F3] dark:bg-[#2A2A2A]">
        <h3 className="text-xl">Message</h3>
        <input placeholder="Search for a user"/>
        <ul className="mt-4">
            {(data!=null && data.friends.length!=0)?(data.friends.map(el=>{
                return <FriendItem userID={el} key={el}/>
            })):"You have no friends :("}
        </ul>
        </div>
    )
}