import { useEffect, useState } from "react"

export default function UserProfile({userID}) {
    let [data, setData] = useState(null);

    useEffect(()=>{
        fetch(`http://localhost:3030/userInfo?userID=${userID}`).then(res=>res.json()).then(data=>{
            setData(data.res);
          });
    }, [])


    if(data==null) return;

    return (
        <div className="absolute right-72 bg-[#111214] rounded-md">
            <div className="bg-gray-500 h-8 rounded-t-md">
            </div>
        <img 
        className="w-16 h-16 bg-gray-600 rounded-full relative top-[-1rem] left-3"
        src={data.pfpURL}
        />
            <div className="p-3 pt-0">
            <h3 className="text-lg">{data.username}</h3>
            <small className="block">User ID: {userID}</small>
            <small>Joined on {new Date(data.createdAt).toDateString()}</small>
            </div>
            <button onClick={()=>{
                console.log(localStorage.getItem("userID"));
                
                fetch(`http://localhost:3030/addFriend?userID=${localStorage.getItem("userID")}&friendID=${userID}`).then(res=>res.json()).then(data=>{
                    console.log(data);
                    
                })
            }}>Add friend</button>
        </div>
    )
}