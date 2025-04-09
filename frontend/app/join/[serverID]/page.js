'use client';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { socketContext } from '@/app/layout';
import { useRouter } from 'next/navigation';
import { AnimatedBackground } from 'animated-backgrounds';

export default function Join({params}) {
    const {sendMessage} = useContext(socketContext);

    let router = useRouter()

    const [data, setData] = useState(null);
    
    useEffect(()=>{
        fetch(`http://localhost:3030/serverInfo?serverID=${params.serverID}`).then(res=>res.json()).then(data=>{
            setData(data.res);
            console.log(data);
            
        })
    }, [])

    return (
        <div
            className="flex h-screen items-center justify-center bg-cover bg-center"
        >
                 <AnimatedBackground animationName="gradientWave"/>
            <div
                className="relative w-full max-w-md p-10 space-y-6 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 rounded-md"
            >
                <div className="flex justify-center">
                    <img
                        src={(data!=null)?data.serverIcon:null} 
                        alt="Profile Image"
                        width={120}
                        height={120}
                        className="rounded-lg shadow-lg"
                    />
                </div>
                <h2 className="text-2xl font-semibold text-center mt-4">
                    You have been invited to join {data?.name}
                </h2>
                <button
                    className="bg-[#51956d] text-[#fff] w-full px-4 py-2 rounded cursor-pointer hover:underline"
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