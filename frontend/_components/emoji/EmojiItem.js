import * as Icons from "@mielo-ui/adwaita-symbolic-icons-react"

export default function EmojiItem({src, name, emojiID, serverID}) {
    return (
        <tr className="mt-2">
            <td>
            <img 
                src={src}
                className="size-12"
            />
            </td>
            <td>
                <span className="block">{name}</span>
            </td>
            <td>
                <small className="text-[#888]">({emojiID})</small>
            </td>
            <td>
            <button className=" text-red-300 hover:text-red-500 block" onClick={()=>{
                fetch(`http://localhost:3030/deleteEmoji?serverID=${serverID}&emojiID=${emojiID}`, {
                    method: "DELETE"
                }).then(res=>res.json()).then(data=>{
                    console.log(data);
                })
            }}><Icons.Status.UserTrashFull/></button>
            </td>
        </tr>
    )
}