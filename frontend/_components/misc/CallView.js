"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { socketContext } from "@/app/layout";
import Peer from "peerjs";

export default function CallView({userID}) {
    const {socketData, sendMessage} = useContext(socketContext);

    const [peerID, setPeerID] = useState("");
    const [remotePeerID, setRemotePeerID] = useState("")

    const videoRef = useRef(null);    
    const remoteVideoRef = useRef(null);

    const peerInstance = useRef(null)

    function call(remotePeerID) {
        let getUserMedia = navigator.getUserMedia;

        getUserMedia({video: true, audio: true}, (mediastream)=>{
            videoRef.current.srcObject=mediastream;
            videoRef.current.play();

            const call = peerInstance.current.call(remotePeerID, mediastream);

            call.on("stream", (remoteStream)=>{
                remoteVideoRef.current.srcObject=remoteStream;
                remoteVideoRef.current.play();
            })
        })
    }

    useEffect(()=>{
        const peer = new Peer();

        peer.on("open", (id)=>{
            setPeerID(id)
        });

        peer.on("call", (call)=>{
            let getUserMedia = navigator.getUserMedia;

            getUserMedia({video: true, audio: true}, (mediastream)=>{
                videoRef.current.srcObject = mediastream;
                videoRef.current.play();
                call.answer(mediastream);

                call.on("stream", (remoteStream)=>{
                    remoteVideoRef.current.srcObject=remoteStream;
                    remoteVideoRef.current.play();
                })
            })
        })
          
        peerInstance.current = peer;
    }, [])

    return (
        <>
        <div>
        <h1>Current user id is {peerID}</h1>
        <input type="text" value={remotePeerID} onChange={e => setRemotePeerID(e.target.value)} />
        <button onClick={() => call(remotePeerID)}>Call</button>
        <video ref={videoRef}></video>
        <video ref={remoteVideoRef}></video>

        </div>
        </>
    )
}