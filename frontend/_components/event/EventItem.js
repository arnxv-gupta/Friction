import { useEffect, useState } from "react"

import * as Icons from "@mielo-ui/adwaita-symbolic-icons-react"


export default function EventItem({name, banner, organizerID, startTime, endTime, deadTime, participants}) {
    
    const [userData, setUserData] = useState({})

    useEffect(()=>{
        fetch(`http://localhost:3030/userInfo?userID=${organizerID}`).then(res=>res.json()).then(data=>{
            setUserData(data.res);
        });
    }, [])    
    
    return (
        <div className="mb-3 border-2 border-[#d4d4d4] dark:border-[#333] bg-[#F3F3F3] dark:bg-[#2A2A2A] rounded">
            <div className="relative">
                <img
                    src={banner}
                    className="w-full h-28 rounded-t object-cover"
                />
                <h4 className="text-lg font-bold m-2">{name}</h4>
            </div>
            <section className="px-2">
                <div className="flex my-3">
                    <img
                        src={userData.pfpURL}
                        className="w-6 h-6 mr-2 rounded-full"
                    />
                    <span>{userData.username}</span>
                </div>
                <div className="text-sm">
                    <span className="flex items-center">
                        <Icons.Categories.EmojiRecent className="inline mr-1"/>
                        {new Date(startTime).getDate() + "/" + new Date(startTime).getMonth() + "/" + new Date(startTime).getFullYear()}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm">
                        {participants.length} participants
                    </span>
                    <button>
                        Join
                    </button>
                    <span>
                        {Date.now()<startTime && Date.now()<endTime?"Not started":null}
                        {Date.now()>startTime && Date.now()<endTime?"In progress":null}
                        {Date.now()>startTime && Date.now()>endTime?"Ended":null}
                    </span>
                </div>
                </section>
        </div>
    )
}