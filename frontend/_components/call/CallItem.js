import Peer from "peerjs";
import { useEffect, useRef } from "react";


export default function CallItem({userID, peerInstance, remotePeerID}) {

    const videoRef = useRef(null)

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

        const peer = peerInstance.current;
        call(remotePeerID)
        

        peer.on("call", (call)=>{
            let getUserMedia = navigator.getUserMedia;

            getUserMedia({video: true, audio: true}, (mediastream)=>{
                // videoRef.current.srcObject = mediastream;
                // videoRef.current.play();
                call.answer(mediastream);

                call.on("stream", (remoteStream)=>{
                    videoRef.current.srcObject=remoteStream;
                    videoRef.current.play();
                })
            });
        });
    }, [])

    return (
        <>
        <video ref={videoRef} />
        {userID}
        </>
    )
}