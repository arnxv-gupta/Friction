import Link from "next/link";
import * as Icons from "@mielo-ui/adwaita-symbolic-icons-react"


export default function ChannelItem({name, type, link, active}) {    
    return (
        <li>
            <Link href={link} className={`px-3 py-2 mx-2 my-1 hover:bg-[#E4E4E4] dark:hover:bg-[#484747] block rounded ${active?"underline font-semibold":null}`}>
                <span className="mr-1 text-lg">{type=="text"?null:<Icons.Status.AudioVolumeHigh className="inline" />}</span>
                {name}            
            </Link>
        </li>
    )
}