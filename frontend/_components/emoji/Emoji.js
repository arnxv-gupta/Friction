import { useContext } from "react"
import { appContext } from "../server/ServerWindow"

export default function Emoji({emojiID, pure=false}) {
    // add hover tooltip
    const data = useContext(appContext)
    const emojiObj = data.emojis.filter((el)=>el.emojiID==emojiID)[0];

    return (
        <img 
            src={emojiObj.src}
            className={`${pure?"w-10 h-7":"w-7 h-5"} inline ml-1`}
        />
    )
}