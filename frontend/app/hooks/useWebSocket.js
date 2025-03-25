"use client";

import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const useWebSocket = (url, userID) => {
  const [socketData, setSocketData] = useState(null);
  const socketRef = useRef(null); // Use useRef for socket instance

  useEffect(() => {
    if (!url) return; // Prevent connection without URL

    socketRef.current = io(url);
    const socket = socketRef.current;

    socket.on("connect", () => {
      socketRef.current.emit("userUpdate", {userID: userID, status: "Online"})
      console.log("Socket connected!");
    });

    socket.on("message", (data) => { // Listen for a message event
      console.log(data, "Data websocket!");
      setSocketData(data);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected!");
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [url]);

  const sendMessage = (message) => {
    if (socketRef.current) {
      socketRef.current.emit("message", message); // Use a consistent event name
      console.log("Sending message:", message);
    }
  };

  return { socketData, setSocketData, sendMessage };
};

export default useWebSocket;