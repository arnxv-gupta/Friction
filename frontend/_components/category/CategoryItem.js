import { useContext, useState } from "react"
import { appContext } from "../server/ServerWindow";
import ChannelItem from "../channel/ChannelItem";

import { FaPlus, FaAngleDown, FaAngleRight } from "react-icons/fa6";

export default function CategoryItem({channels, name, showDialog}) {
    const data = useContext(appContext)
    const [isOpen, setOpen] = useState(true)
    
    return (
        <>
        <h3 className="px-3 flex justify-between items-center">
            <span className="block flex-1 cursor-pointer items-center" onClick={()=>{
            setOpen(!isOpen)
            }}>
            {isOpen?<FaAngleDown  icon="tabler:chevron-down" className="inline mr-1"/>:<FaAngleRight  className="inline mr-1"/>}{name}
            </span>
            <FaPlus className="inline text-base cursor-pointer" onClick={()=>{
                showDialog(true);
            }}/>
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