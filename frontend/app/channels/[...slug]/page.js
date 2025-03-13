"use client";
import ServerList from "@/_components/ServerList";
import ServerWindow from "@/_components/ServerWindow";

export default function Channels() {

  return (
      <div className="flex">
        <ServerList />
        <ServerWindow/>
      </div>
  );
}
