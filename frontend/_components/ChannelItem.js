import Link from "next/link";
import OptionItem from "./OptionItem";
import { useContext, useState } from "react";
import { appContext } from "./ServerWindow";
import { Icon } from "@iconify/react";

export default function ChannelItem({name, type, link, active}) {    
    const data = useContext(appContext);
        
    const [showDropdown, setDropdownVisibility] = useState(false);
    return (
        <li onContextMenu={(e)=>{
            if(e.nativeEvent.button === 2) {
                e.preventDefault()
                setDropdownVisibility(true)             
            }
        }}>
            <Link href={link} className={`px-3 py-2 m-2 hover:bg-[#35373C] block rounded ${active?"underline font-semibold":null}`}>
                <span className="mr-1 text-lg">{type=="text"?<Icon icon="tabler:hash" className="inline"/>:<Icon icon="tabler:volume" className="inline" />}</span>
                {name}            
            </Link>
            {
                showDropdown?(
            <ul className={`bg-[#111214] rounded m-2 absolute top-0 right-0`}>
                <OptionItem label="op1" />
                <OptionItem label="op2" />
            </ul>
                ):null
            }
        </li>
    )
}