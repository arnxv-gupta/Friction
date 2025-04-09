export default function EmojiList({emojiList, inputRef, setVisible}) {
    
    if(!emojiList) return null;

    return (
        <ul className="flex">
            {emojiList.map(el=>(
                <li 
                    className="m-1"
                    onClick={()=>{
                        inputRef.current.innerText+=`<!${el.emojiID}>`
                        setVisible(false)
                    }}
                >
                    <img
                        src={el.src}
                        className="w-10 h-7"
                    />
                </li>
            ))}
        </ul>
    )
}