"use client";
import ServerList from "@/_components/server/ServerList";
import ServerWindow from "@/_components/server/ServerWindow";

export default function Channels() {
  return (
      <div className="flex">
        <ServerList />
        <ServerWindow/>
      </div>
  );
}
