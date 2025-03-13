"use client"
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { createContext, useState } from "react";
import useWebSocket from "/app/hooks/useWebSocket";
import {Archivo} from "next/font/google"

const archivo = Archivo({
    subsets: ['latin'], // Specify the character sets you need
    variable: '--font-archivo', // Optional: for CSS variable usage
  });


config.autoAddCss = false

export const socketContext = createContext("");

export default function RootLayout({ children }) {
  const { socketData, setSocketData, sendMessage } = useWebSocket(
    "http://localhost:3030/",
    12121212
  );

  return (
    <html lang="en" className={archivo.variable}>
      <body>
      <socketContext.Provider value={{socketData, sendMessage}}>
        {children}
      </socketContext.Provider>
      </body>
    </html>
  );
}
