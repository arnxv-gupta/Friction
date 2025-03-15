import { useContext, useEffect, useRef } from "react"
import { socketContext } from "@/app/layout";
// import Peer from "peer";

export default function VideoView() {
    const {socketData, sendMessage} = useContext(socketContext);
    const videoRef = useRef(null)
   // const peerServer = PeerServer({ port: 9000, path: "/myapp" });

    useEffect(()=>{
        navigator.getUserMedia(
            { audio: true, video: { width: 1280, height: 720 } },
            (stream) => {
                console.log(typeof stream);
                
                sendMessage(stream);
                if(typeof socketData!="string") {
              videoRef.current.srcObject = socketData;
                    console.log("GOT VIDEO STREAM");
                    
            }
              videoRef.current.onloadedmetadata = (e) => {
                videoRef.current.play();
                
              };
            },
            (err) => {
              console.error(`The following error occurred: ${err.name}`);
            },
          );
    }, [])

    return (
        <>
        <div>
        <video ref={videoRef}></video>
        </div>
        </>
    )
}