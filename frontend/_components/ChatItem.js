"use client";

import { useContext, useEffect, useState } from "react";
import UserMention from "./UserMention";
import { appContext } from "./ServerWindow";

export default function ChatItem({ authorID, text, timestamp, image, continued }) {
    const data = useContext(appContext);
    const [isMentioned, setIsMentioned] = useState(text.match(`<@${localStorage.getItem("userID")}>`))
    const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3030/userInfo?userID=${authorID}`)
      .then((res) => res.json())
      .then((data) => {
        setAuthorData(data.res);
      });
  }, []);

  if (authorData == null) {
    return;
  }

  if(continued) {
    return (
      <li className={`px-5 flex ${isMentioned?"bg-[#444037]":"hover:bg-[#2E3035]"}`}>
          <div className="w-14 h-2"></div>
          <pre className="whitespace-normal">
              {text.match(/<@(.*?)>/)?(text.split(/<@(.*?)>/).map((el, index)=>{
  
                  if(!text.match(/<@(.*?)>/).includes(el)|| el==" ") {
                      return el;
                  } else {
                      return <UserMention userID={el} />
                  }
              })):text}</pre>
      </li>
    );
  } else {
    return (
      <li className={`px-6 mt-2 flex ${isMentioned?"bg-[#444037]":"hover:bg-[#2E3035]"}`}>
        <img
          src={
            authorData.pfpURL == null
              ? "http://velocityacademy.org/wp-content/uploads/2016/03/placeholder.jpg"
              : authorData.pfpURL
          }
          className="rounded-full size-10 mr-3 mt-1"
        />
        <div>
          <div className="flex items-center mb-1">
            <div className="flex items-baseline">
              <h5 className="text-md">{authorData.username}</h5>
              <time className="text-xs text-[#b5b5b5] ml-2">{((new Date(timestamp).getDate()<=9?"0"+new Date(timestamp).getDate():new Date(timestamp).getDate()) + "/" + (new Date(timestamp).getMonth()+1<=9?"0"+(new Date(timestamp).getMonth()+1):new Date(timestamp).getMonth()+1) + "/" + new Date(timestamp).getFullYear())}</time>
            </div>
          </div>
          {image != null ? <img src={image} className="max-w-xl" /> : null}
          <pre className="whitespace-normal">
              {text.match(/<@(.*?)>/)?(text.split(/<@(.*?)>/).map((el, index)=>{
  
                  if(!text.match(/<@(.*?)>/).includes(el)|| el==" ") {
                      return el;
                  } else {
                      return <UserMention userID={el} />
                  }
              })):text}</pre>
        </div>
      </li>
    );
  }
  
}
