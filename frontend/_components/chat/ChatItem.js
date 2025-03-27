"use client";

import { useEffect, useState, useRef } from "react";
import UserMention from "../misc/UserMention";
import CustomImage from "../misc/CustomImage";
import Link from "next/link";
import Emoji from "../emoji/Emoji";
import UserProfile from "../misc/UserProfile";

export default function ChatItem({ authorID, roleData, text, timestamp, image, continued, type }) {
  const [isMentioned] = useState(text.match(`<@${localStorage.getItem("userID")}>`));
  const [authorData, setAuthorData] = useState(null);
  const [isProfileVisible, setProfileVisible] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:3030/userInfo?userID=${authorID}`)
      .then((res) => res.json())
      .then((data) => {
        setAuthorData(data.res);
      });

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileVisible(false);
      }
    };

    if (isProfileVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [authorID, isProfileVisible]);

  if (authorData == null) {
    return null;
  }

  console.log(roleData);
  

  const processText = (inputText) => {
    const parts = inputText.split(/(<@.*?>(?:<\/UserMention>)?)|(https?:\/\/[^\s]+)|(<!\d+>)/g);
    return parts.map((part, index) => {
      if (part && part.startsWith("<@")) {
        const userIDMatch = part.match(/<@(.*?)>/);
        if (userIDMatch) {
          return <UserMention key={index} userID={userIDMatch[1]} />;
        }
      } else if (part && part.startsWith("http")) {
        return (
          <Link
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1c71d8] dark:text-[#78aeed] hover:underline"
          >
            {part}
          </Link>
        );
      } else if (part && part.startsWith("<!")) {
        const numberMatch = part.match(/<!(\d+)>/);

        // only emoji no text
        if(inputText==`<!${numberMatch[1]}>`) {
          return <Emoji key={index} emojiID={numberMatch[1]} pure={true}/>;
        }
        if (numberMatch) {
          return <Emoji key={index} emojiID={numberMatch[1]} />;
        }
      } else {
        return part;
      }
      return null;
    });
  };

  return (
    <li
      className={`px-5 mt-1 flex w-auto ${isMentioned ? "bg-[#444037]" : "hover:bg-[#E4E4E4] dark:hover:bg-[#2E343D]"}`}
    >
      {continued ? (
        <div className="w-[57px] h-2"></div>
      ) : (
        <img
          src={
            authorData.pfpURL == null
              ? "http://velocityacademy.org/wp-content/uploads/2016/03/placeholder.jpg"
              : authorData.pfpURL
          }
          onClick={()=>{setProfileVisible(true)}}
          className="rounded-full w-10 h-10 mr-4 mt-1"
        />
      )}

      <div className="relative">
        {continued ? null : (
          <div className="flex items-center mb-1">
            <div className="flex items-baseline">
              <h5
                className="text-md font-semibold cursor-pointer text-[#2e2e2e] dark:text-[#fff]"
                style={roleData.color!="#FFFFFF"?{ color: roleData.color }:null}
                onClick={() => setProfileVisible(true)}
              >
                {authorData.username}
              </h5>
              <time className="text-xs text-[#909090] ml-2">
                {new Date(timestamp).getDate().toString().padStart(2, "0")}/
                {(new Date(timestamp).getMonth() + 1).toString().padStart(2, "0")}/
                {new Date(timestamp).getFullYear()}
              </time>
            </div>
          </div>
        )}
        {image != null ? <CustomImage src={image} /> : null}
        <pre className="whitespace-normal flex items-center">
          {processText(text)}
        </pre>

        {isProfileVisible && (
          <div
            ref={profileRef}
            className="absolute top-full w-[30vw] left-0 z-[1000]"
          >
            <div className="absolute top-[-50px]">
            <UserProfile userID={authorID} />
            </div>
          </div>
        )}
      </div>
    </li>
  );
}