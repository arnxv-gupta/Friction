import InboxList from "@/_components/inbox/InboxList";
import ServerList from "@/_components/server/ServerList";

export default function Inbox() {
    return (
        <div className="flex">
            <ServerList />
            <InboxList />
        </div>   
    )
}