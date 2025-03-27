import { useEffect, useState } from "react"

export default function UserProfile({userID}) {
    let [data, setData] = useState(null);

    useEffect(()=>{
        fetch(`http://localhost:3030/userInfo?userID=${userID}`).then(res=>res.json()).then(data=>{
            setData(data.res);
          });
    }, [])


    if(data==null) 
        return;

    return (
        <div className="bg-[#EBEBEB] border-2 border-[#d4d4d4] dark:border-[#333] rounded-md z-50">
            <div className="bg-gray-500 h-8 rounded-t-md">
            </div>
            <div className="flex">
                <img 
                className="size-16 bg-gray-600 rounded-full relative top-[-1.5rem] left-2"
                src={data.pfpURL}
                />
                <h3 className="text-lg font-medium mb-1 ml-4">{data.username}</h3>
            </div>
            
            {/* roles */}
            <div>
                {}
            </div>
            
            <div className="p-2 pt-0">
                <div className="flex flex-col">
                    <small className="text-[#888]">User ID: {userID}</small>
                    <small className="text-[#888]">Joined on {new Date(data.createdAt).toDateString()}</small>
                </div>
            </div>
            <button className="m-3" onClick={()=>{
                fetch(`http://localhost:3030/addFriend?userID=${localStorage.getItem("userID")}&friendID=${userID}`).then(res=>res.json()).then(data=>{
                    console.log(data);
                });
            }}>Add friend</button>
        </div>
    )
}