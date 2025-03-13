import { useEffect, useState } from "react"

export default function MentionItem({userID}) {

    const [data, setData] = useState(null);

    useEffect(()=>{
        fetch(`http://localhost:3030/userInfo?userID=${userID}`).then(res=>res.json()).then(data=>{
            //console.log(data);
            setData(data.res);
          })
    }, [])

    if(data==null) return
    console.log(data);
    
    return (
        <li className="flex justify-between hover:bg-[#343942] p-2 rounded">
        <span className="flex items-center">
            <img src={data.pfpURL} className="rounded-full size-[1.4rem] mr-2"/>
            {data.username}
        </span>
        <span className="text-gray-500 text-sm">{userID}</span>
        </li>
    )
    
}