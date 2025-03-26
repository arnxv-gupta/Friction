import Link from "next/link";
import { useContext } from "react";
import { appContext } from "../server/ServerWindow";
import { Icon } from "@iconify/react";

export default function ChannelItem({name, type, link, active}) {    
    const data = useContext(appContext);
    return (
        <li>
            <Link href={link} className={`px-3 py-2 m-2 hover:bg-[#35373C] block rounded ${active?"underline font-semibold":null}`}>
                <span className="mr-1 text-lg">{type=="text"?<Icon icon="tabler:hash" className="inline"/>:<Icon icon="tabler:volume" className="inline" />}</span>
                {name}            
            </Link>
        </li>
    )
}