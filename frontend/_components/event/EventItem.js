import { useEffect, useState } from "react";
import * as Icons from "@mielo-ui/adwaita-symbolic-icons-react";
import { useRouter } from "next/navigation";

export default function EventItem({name, banner, organizerID, startTime, endTime, deadTime, participants, serverID, eventID}) {
  const [userData, setUserData] = useState({});

  let router = useRouter()

  useEffect(() => {
    fetch(`http://localhost:3030/userInfo?userID=${organizerID}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.res);
      });
  }, [organizerID]);

  const handleJoinEvent = () => {
    console.log(serverID, eventID, Number(localStorage.getItem("userID")));

    fetch(`http://localhost:3030/joinEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serverID: serverID,
        eventID: eventID,
        userID: Number(localStorage.getItem("userID")),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        router.refresh();
    });
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
  };

  const formatTime = (date) => {
    if (!date) return "N/A";
    const newDate = new Date(date);
    const hours = newDate.getHours().toString().padStart(2, "0");
    const minutes = newDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const eventStatus = () => {
    const now = Date.now();
    if (now < startTime) return "Not started";
    if (now >= startTime && now <= endTime) return "In progress";
    return "Ended";
  };

  return (
    <div className="mb-4 border-b-2 border-[#d4d4d4] dark:border-[#333] bg-[#FAFAFA] dark:bg-[#2A2A2A] rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={banner}
          alt="Event Banner"
          className="w-full h-48 object-cover"
        />
        <h4 className="text-xl font-semibold absolute bottom-0 left-0 p-4 text-white bg-gradient-to-t from-black w-full">
          {name}
        </h4>
      </div>
      <section className="p-4">
        <div className="flex items-center mb-2">
          <img
            src={userData.pfpURL}
            alt="Organizer Profile"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {userData.username}
          </span>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span className="flex items-center">
            <Icons.Categories.EmojiRecent className="inline mr-1" />
            {formatDate(startTime)} ({formatTime(startTime)}) - {formatTime(endTime)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {participants.length} participants
          </span>
          <div>
            {participants.includes(Number(localStorage.getItem("userID"))) ? (
              <span className="text-green-500 font-semibold">Joined</span>
            ) : (
              <button
                onClick={handleJoinEvent}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Join
              </button>
            )}
          </div>
          <span className={`text-sm ${eventStatus() === 'Not started' ? 'text-gray-500' : eventStatus() === 'In progress' ? 'text-yellow-500' : 'text-red-500'}`}>
            {eventStatus()}
          </span>
        </div>
      </section>
    </div>
  );
}