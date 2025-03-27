import { useState, useEffect } from "react";

export default function UserMention({userID}) {
    const [username, setUsername] = useState(userID);
    useEffect(()=>{
            fetch(`http://localhost:3030/userInfo?userID=${userID}`).then(res=>res.json()).then(data=>{
                if(data.type=="SUCCESS") {
                setUsername("@" + data.res.username)
                } else {
                setUsername("Invalid userID");
                }
            })
    }, [])
    return (
        <span className="bg-[#BFD7F3] text-[#393B36] dark:bg-[#4e4f77] dark:text-[#bcbee8] px-1 hover:underline cursor-pointer">
            {username}
        </span>
    )
}