import { useContext, useEffect, useRef } from "react"
import { socketContext } from "@/app/layout";
// import Peer from "peer";

export default function VideoView({userID}) {
    const {socketData, sendMessage} = useContext(socketContext);
    const videoRef = useRef(null)
   // const peerServer = PeerServer({ port: 9000, path: "/myapp" });

    useEffect(()=>{
        
    }, [])

    return (
        <>
        <div>
        <video ref={videoRef}></video>
        </div>
        </>
    )
}