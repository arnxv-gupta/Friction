"use client";

import { useEffect, useState } from "react";
import UserMention from "../misc/UserMention";
import CustomImage from "../misc/CustomImage";
import Link from "next/link";

export default function ChatItem({
  authorID,
  roleData,
  text,
  timestamp,
  image,
  continued,
  type,
}) {
  const [isMentioned] = useState(
    text.match(`<@${localStorage.getItem("userID")}>`)
  );
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

  const processText = (inputText) => {
    const parts = inputText.split(/(<@.*?>(?:<\/UserMention>)?)|(https?:\/\/[^\s]+)/g);
    return parts.map((part, index) => {
      if (part && part.startsWith("<@")) {
        const userIDMatch = part.match(/<@(.*?)>/);
        if (userIDMatch) {
          return <UserMention key={index} userID={userIDMatch[1]} />;
        }
      } else if (part && part.startsWith("http")) {
        return (
          <>
          <Link
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7EAAFF] hover:underline"
          >
            {part}
          </Link>
          </>
        );
      } else {
        return part;
      }
      return null;
    });
  };

  return (
    <li
      className={`px-5 mt-1 flex w-auto ${
        isMentioned ? "bg-[#444037]" : "hover:bg-[#2E343D]"
      }`}
    >
      {continued ? (
        <div className="w-[54px] h-2"></div>
      ) : (
        <>
          <img
            src={
              authorData.pfpURL == null
                ? "http://velocityacademy.org/wp-content/uploads/2016/03/placeholder.jpg"
                : authorData.pfpURL
            }
            className="rounded-full size-10 mr-3 mt-1"
          />
        </>
      )}
      <div>
        {continued ? null : (
          <div className="flex items-center mb-1">
            <div className="flex items-baseline">
              <h5 className="text-md font-medium" style={{ color: roleData.color }}>
                {authorData.username}
              </h5>
              <time className="text-xs text-[#b5b5b5] ml-2">
                {new Date(timestamp).getDate() <= 9
                  ? "0" + new Date(timestamp).getDate()
                  : new Date(timestamp).getDate()}
                /
                {new Date(timestamp).getMonth() + 1 <= 9
                  ? "0" + (new Date(timestamp).getMonth() + 1)
                  : new Date(timestamp).getMonth() + 1}
                /
                {new Date(timestamp).getFullYear()}
              </time>
            </div>
          </div>
        )}
        {image != null ? <CustomImage src={image} /> : null}
        <pre className="whitespace-normal">
          {processText(text)}
        </pre>
      </div>
    </li>
  );
}