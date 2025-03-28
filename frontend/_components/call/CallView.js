"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { socketContext } from "@/app/layout";
import Peer from "peerjs";
import { appContext } from "../server/ServerWindow";
import CallItem from "./CallItem";

export default function CallView() {
    const {socketData} = useContext(socketContext);
    const data = useContext(appContext)

    let connections = data.connections.find(el=>data.currChannel==el.channelID)?.connections;

    const [peerID, setPeerID] = useState("");

    const videoRef = useRef(null);    

    const peerInstance = useRef(null)

    console.log(connections);

    useEffect(()=>{
        const peer = new Peer();

        peer.on("open", (id)=>{
            setPeerID(id)
            fetch("http://localhost:3030/joinVoice", {
                method: "post",
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
                console.log(data);
                
                //sendMessage("VOICE JOINED!")
            })
        });

        peer.on("disconnected", (id)=>{
            console.log(id)
        })
          
        peerInstance.current = peer;
    }, [])


    if(!peerID) {
        return <span>Loading</span>
    }

    return (
        <>
        <div>
            {connections && connections.map((el)=>{
                return <CallItem userID={Number(el.userID)} peerInstance={peerInstance} remotePeerID={el.peerID}/>
            })}
        </div>
        </>
    )
}