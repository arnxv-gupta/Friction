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
        <span className="bg-[#4e4f77] text-[#bcbee8]">
            {username}
        </span>
    )
}