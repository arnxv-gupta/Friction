import { useContext, useState } from "react"
import { appContext } from "../server/ServerWindow";
import ChannelItem from "../channel/ChannelItem";

import * as Icons from "@mielo-ui/adwaita-symbolic-icons-react"

export default function CategoryItem({channels, name, showDialog}) {
    const data = useContext(appContext)
    const [isOpen, setOpen] = useState(true)
    
    return (
        <>
        <h3 className="px-3 flex justify-between items-center">
            <span className="flex-1 cursor-pointer flex items-center" onClick={()=>{
            setOpen(!isOpen)
            }}>
            {isOpen?
            <Icons.Actions.GoDown  className="inline mr-1 size-3 icons"/>:
            <Icons.Actions.GoNext  className="inline mr-1 size-3 icons"/>}
            {name}
            </span>
            <Icons.Actions.ListAdd className="inline text-base cursor-pointer icons" onClick={()=>{
                showDialog(true);
            }}/>
            </h3>
        {isOpen?(
            channels.map((el, i)=>{
                return (
                    <ChannelItem
                    key={i}
                    link={`/chat/${data.serverID}/${el.channelID}/`}
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