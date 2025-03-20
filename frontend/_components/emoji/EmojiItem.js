export default function EmojiItem({src, name, emojiID, serverID}) {
    return (
        <li className="text-center p-3 m-2 outline outline-[#888] outline-1 rounded">
            <img 
                src={src}
                className="size-12 mx-auto"
            />
            <span className="block">{name}</span>
            <small className="text-[#888]">({emojiID})</small>
            <button className="block" onClick={()=>{
                fetch(`http://localhost:3030/deleteEmoji?serverID=${serverID}&emojiID=${emojiID}`, {
                    method: "DELETE"
                }).then(res=>res.json()).then(data=>{
                    console.log(data);
                })
            }}>Delete</button>
        </li>
    )
}