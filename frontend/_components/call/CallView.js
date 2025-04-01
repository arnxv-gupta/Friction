"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { socketContext } from "@/app/layout";
import Peer from "peerjs";
import { appContext } from "../server/ServerWindow";
import CallItem from "./CallItem";

export default function CallView() {
    const {socketData, sendMessage} = useContext(socketContext);
    const data = useContext(appContext)
    console.log(data);

    if(!data) {
        return <span>data not </span>
    }
    
    let connections = data.connections.find(el=>data.currChannel==el.channelID)?.connections;

    const [peerID, setPeerID] = useState("");

    const peerInstance = useRef(null)

    console.log(connections);

    useEffect(()=>{
        const peer = new Peer();
        console.log(peer);
        
        
        peer.on("open", (id)=>{
            console.log(123);
            
            setPeerID(id)
            fetch("http://localhost:3030/joinVoice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userID:Number(localStorage.getItem("userID")),
                    serverID: data.serverID,
                    voiceID:Number(data.currChannel),
                    peerID: id
                })
            }).then(res=>res.json()).then(data=>{
                console.log("132");
                
                sendMessage("VOICE JOINED!")
            })
        });

        peer.on("disconnected", (id)=>{
            console.log(id)
        })
          
        peerInstance.current = peer;
    }, [])

    return (
        <>
        <div>
            vc
            {connections && connections.map((el)=>{
                return <CallItem userID={Number(el.userID)} peerInstance={peerInstance} remotePeerID={el.peerID}/>
            })}
        </div>
        </>
    )
}