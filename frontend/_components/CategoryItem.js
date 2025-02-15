import { useContext, useState } from "react"
import ChannelItem from "./ChannelItem";
import { appContext } from "./ServerWindow";
import { Icon } from "@iconify/react";

export default function CategoryItem({channels, name}) {
    const data = useContext(appContext)
    const [isOpen, setOpen] = useState(true)
    
    return (
        <>
        <h3 className="px-3 flex justify-between">
            <span className="block flex-1 cursor-pointer " onClick={()=>{
            setOpen(!isOpen)
        }}>
            {isOpen?<Icon icon="tabler:chevron-down" className="inline mr-1"/>:<Icon icon="tabler:chevron-right"  className="inline mr-1"/>}{name}
            </span>
            <Icon icon="tabler:plus" className="inline cursor-pointer" />
            </h3>
        {isOpen?(
            channels.map((el, i)=>{
                return (
                    <ChannelItem
                    key={i}
                    link={`/channels/${data.serverID}/${el.channelID}/`}
                    name={el.name}
                    type={el.type}
                    active={el.channelID === data.currChannel}
                  />
                )
            })
        ):null}
        </>
    )
}