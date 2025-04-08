import { useEffect, useState } from "react";
import * as Icons from "@mielo-ui/adwaita-symbolic-icons-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EventItem({
  name,
  organizerID,
  startTime,
  endTime,
  participants,
  serverID,
  eventID,
  location,
  desc,
}) {
  const [userData, setUserData] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:3030/userInfo?userID=${organizerID}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.res);
      });
  }, [organizerID]);

  const handleJoinEvent = () => {
    fetch(`http://localhost:3030/joinEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serverID,
        eventID,
        userID: Number(localStorage.getItem("userID")),
      }),
    })
      .then((res) => res.json())
      .then(() => {
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

  const getStatusStyle = (status) => {
    switch (status) {
      case "Not started":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "In progress":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Ended":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-neutral-200 text-neutral-700 border-neutral-300";
    }
  };

  const status = eventStatus();
  const userJoined = participants.includes(Number(localStorage.getItem("userID")));

  return (
    <div className="mb-6 rounded-xl shadow border dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800">
      <div className="px-5 py-4 border-b dark:border-neutral-700">
        <h2 className="text-xl font-semibold tracking-tight">{name}</h2>
      </div>

      <section className="p-5 space-y-4 text-sm">
        {/* Organizer */}
        <div className="flex items-center space-x-3">
          {userData.pfpURL && (
            <img
              src={userData.pfpURL}
              alt="Organizer Profile"
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {userData.username}
          </span>
        </div>

        {/* Time Info */}
        <div className="space-y-1 text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center space-x-2">
            <Icons.Categories.EmojiRecent className="w-4 h-4" />
            <span className="text-sm">
              {formatDate(startTime)} ({formatTime(startTime)}) –{" "}
              {formatDate(endTime)} ({formatTime(endTime)})
            </span>
          </div>
        </div>

        {/* Description */}
        {desc && (
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            {desc}
          </p>
        )}

        {/* Location */}
        {location && (
          <div>
            {/^(https?:\/\/)/.test(location) ? (
              <Link
                href={location}
                className="text-sm underline underline-offset-2 text-neutral-700 dark:text-neutral-300"
              >
                {location}
              </Link>
            ) : (
              <div className="text-sm text-neutral-700 dark:text-neutral-300">
                {location}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t dark:border-neutral-700">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {participants.length} participant{participants.length !== 1 ? "s" : ""}
          </span>

          <div className="flex items-center gap-2 ml-auto">
            {status !== "Ended" &&
              (userJoined ? (
                <span className="px-3 py-1.5 text-xs font-medium rounded-md border bg-green-100 text-green-700 border-green-300">
                  Joined
                </span>
              ) : (
                <button
                  onClick={handleJoinEvent}
                  className="px-3 py-1.5 border border-neutral-500 rounded-md text-sm font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
                >
                  Join
                </button>
              ))}

            <span
              className={`px-3 py-1.5 text-xs font-medium rounded-md border ${getStatusStyle(
                status
              )}`}
            >
              {status}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
