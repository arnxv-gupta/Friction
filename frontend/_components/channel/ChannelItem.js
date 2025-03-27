import Link from "next/link";
import { Icon } from "@iconify/react";

export default function ChannelItem({name, type, link, active}) {    
    return (
        <li>
            <Link href={link} className={`px-3 py-2 mx-2 my-1 hover:bg-[#E4E4E4] block rounded ${active?"underline font-semibold":null}`}>
                <span className="mr-1 text-lg">{type=="text"?null:<Icon icon="tabler:volume" className="inline" />}</span>
                {name}            
            </Link>
        </li>
    )
}