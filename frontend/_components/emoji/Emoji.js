import { useContext, useEffect, useState } from "react"
import { appContext } from "../server/ServerWindow"

export default function Emoji({emojiID}) {
    // add hover tooltip
    console.log(emojiID);
    
    const data = useContext(appContext)
    const emojiObj = data.emojis.filter((el)=>el.emojiID==emojiID)[0];
    console.log(emojiObj);
    
    return (
        <img 
            src={emojiObj.src}
            className="size-7 inline ml-1"
        />
    )
}