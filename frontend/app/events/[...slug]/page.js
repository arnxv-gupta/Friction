import ServerList from "@/_components/server/ServerList";
import ServerWindow from "@/_components/server/ServerWindow";

export default function Events() {
    return (
        <div className="flex">
            <ServerList />
            <ServerWindow />
        </div>
    )
}