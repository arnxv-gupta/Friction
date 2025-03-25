"use client"
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { createContext } from "react";
import useWebSocket from "/app/hooks/useWebSocket";

config.autoAddCss = false

export const socketContext = createContext("");

export default function RootLayout({ children }) {
  const { socketData, sendMessage } = useWebSocket(
    "http://localhost:3030/",
    Number(localStorage.getItem("userID"))
  );

  return (
    <html lang="en" className="h-full">
      <body className="h-full">
      <socketContext.Provider value={{socketData, sendMessage}}>
        {children}
      </socketContext.Provider>
      </body>
    </html>
  );
}
