"use server"
import ServerList from "@/_components/server/ServerList";
import ServerWindow from "@/_components/server/ServerWindow";

export async function generateMetadata({params}) {

  const {slug} = params;

  if(slug[0] && slug[0]=="%40me") {
    return {
      title: "Friction | Friends"
    }
  }

  let res = await fetch(`http://localhost:3030/serverInfo?serverID=${slug[0]}`).then(res=>res.json());
  let data = res.res;

  return {
    title: ("Friction | " + data.name)
  }
}
export default async function Channels() {
  return (
      <div className="flex">
        <ServerList />
        <ServerWindow/>
      </div>
  );
}
