import { useEffect, useState } from "react";
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
        <div className="w-64 p-4 h-screen flex flex-col bg-[#2B2D31]">
        <h3>Friends</h3>
        <ul className="mt-4">
            {(data!=null && data.friends.length!=0)?(data.friends.map(el=>{
                return <FriendItem name={el} />
            })):"You have no friends :("}
        </ul>
        </div>
    )
}