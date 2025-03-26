"use client"

import { useContext, useEffect, useRef, useState } from 'react';

import {appContext} from "../server/ServerWindow"
import { socketContext } from '@/app/layout';
import MentionItem from '../misc/MentionItem';

import { FaPlus, FaLaugh  } from 'react-icons/fa';
import EmojiList from '../emoji/EmojiList';

export default function ChatInput({userID, serverID, chatID}) {

    const {sendMessage} = useContext(socketContext);
    const data = useContext(appContext)
    console.log(data);
    
    const [imageURL, setImageURL] = useState(null)
    const inputRef = useRef(null);

    const [isListVisible, setListVisible] = useState(false);
    const [isEmojiVisible, setEmojiVisible] = useState(false);
    function send() {
        if(inputRef.current.innerText.length==0 || inputRef.current.innerText==null) {
            console.log("Unabel to sent empty message");
            return;
        }

        fetch("http://localhost:3030/sendMessage", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                authorID:userID,
                serverID: serverID,
                channelID: chatID,
                text: inputRef.current.innerText,
                image: imageURL
            })
        }).then(res=>res.text()).then(data=>{
            inputRef.current.innerText = null;         
            sendMessage("MESSAGE RECEIVED!")
        })
    }
    
    return (
        <section>
        {isListVisible &&
        <div className="mx-3 p-1">
            <ul className="p-2 bg-[#2E343D] rounded">
                <h5 className="mb-3">Members</h5>
                {data!=null?data.membersList.map(el=>{
                    if(el!=localStorage.getItem("userID"))
                    return (
                        <li onClick={()=>{
                            setListVisible(false)
                            inputRef.current.innerText = inputRef.current.innerText.substring(0, inputRef.current.innerText.length-1) + `<@${el}> `;
                        }}>
                            <MentionItem userID={el}/>
                        </li>
                )
                }):null}
                
            </ul>
        </div>
        }
        {isEmojiVisible && 
        <div className="mx-3 p-1">
            <ul className="p-2 bg-[#2E343D] rounded">
                 <h5 className="mb-3">Emojis</h5>
                   <EmojiList emojiList={data.emojis} inputRef={inputRef} setVisible={setEmojiVisible}/>
            </ul>
        </div>
        }
        <div className="mx-3 px-3 py-3 bg-[#2E343D] flex items-center rounded-lg">
        <label for="imageUploader" className="group bg-gray-500 hover:bg-[#343434] cursor-pointer p-1 rounded-full flex items-center justify-center">
        <FaPlus className="text-[#343434] group-hover:text-gray-500"/>
        </label>
        <input className="hidden" id="imageUploader" type="file" accept="image/*" onChange={(e)=>{
            let formData = new FormData()
            formData.append("image", e.target.files[0]);
            fetch("http://localhost:3030/uploadImage", {
                method: "POST",
                body: formData
            }).then(res=>res.json()).then(data=>{
                if(data.type=="SUCCESS") {
                    setImageURL(data.res);
                }  
            })
            
        }}/>
        <img src={imageURL} className={`ml-2 size-12 ${imageURL?"block":"hidden"}`} onClick={()=>{
            setImageURL(null)
        }}/>
        <pre
        className="flex-grow block ml-3 border-none bg-transparent text-white placeholder-gray-400 focus:outline-none transition duration-200"
        placeholder="Type a message"
        spellCheck={false}
        autoFocus={true}
        ref={inputRef}
        contentEditable={true}
        value={""}
        onKeyDown={(e)=>{
            if(e.code=="Enter") { 
                e.preventDefault()
                send();
            }
            if(e.key=="@") {
                setListVisible(true)
            }
            if(e.key=="Backspace" && isListVisible) {
                setListVisible(false)
            }
            
        }}
        ></pre>
        <button
        onClick={()=>{
            setEmojiVisible(true)
        }}>
            <FaLaugh className="text-gray-500 text-2xl"/>
        </button>
    </div>
    </section>
    )
}