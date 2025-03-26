'use client';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { socketContext } from '@/app/layout';
import { useRouter } from 'next/navigation';

export default function Join({params}) {
    const {sendMessage} = useContext(socketContext);

    const username = localStorage.getItem("userID");
    let router = useRouter()

    const [data, setData] = useState(null);
    
    useEffect(()=>{
        fetch(`http://localhost:3030/serverInfo?serverID=${params.serverID}`).then(res=>res.json()).then(data=>{
            setData(data.res);
        })
    }, [])

    return (
        <div
            className="flex h-screen items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: "url('/bg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}
        >
            <div
                className="relative w-full max-w-md p-10 space-y-6 bg-white bg-opacity-90 text-gray-900 rounded-md shadow-lg"
                style={{
                    maxHeight: '600px',
                    overflow: 'hidden',
                }}
            >
                <div className="flex justify-center">
                    <img
                        src={(data!=null)?data.serverIcon:null} 
                        alt="Profile Image"
                        width={120}
                        height={120}
                        className="rounded-full border-4 border-white shadow-lg"
                    />
                </div>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mt-4">
                    {username} has invited you to join their server
                </h2>
                <button
                    className="bg-blue-600 w-full py-3 px-4 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all duration-200"
                    onClick={()=>{
                        fetch(`http://localhost:3030/joinServer?serverID=${params.serverID}&userID=${localStorage.getItem("userID")}`).then(res=>res.json()).then(data=>{
                            sendMessage("USER JOINED!")
                            router.push(`/chat/${params.serverID}`)
                            
                        })
                    }}
                >
                    Join Server
                </button>
            </div>
        </div>
    );
};