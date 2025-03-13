"use client"

import { useContext, useEffect, useRef, useState } from 'react';
import { FaPlus, FaGift, FaRegSmile } from 'react-icons/fa';
import {appContext} from "./ServerWindow"
import MentionItem from './MentionItem';
import { socketContext } from '@/app/layout';

export default function ChatInput({userID, serverID, chatID}) {

    const {socketData, sendMessage} = useContext(socketContext);
    const members = useContext(appContext)

    const [imageURL, setImageURL] = useState(null)
    const inputRef = useRef(null);

    const [isListVisible, setListVisible] = useState(false);

    function send() {
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
            console.log(data);
            console.log(imageURL);
            
            inputRef.current.innerText = null;         
            sendMessage("MESSAGE RECEIVED!")
        })
    }
    
    return (
        <section>
        {isListVisible &&
        <div className="mx-3 p-1">
            <ul className="p-2 bg-[#2E343D] rounded">
                <h5 className="mb-3">MEMBERS</h5>
                {members!=null?members.membersList.map(el=>{
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
        <div className="mx-3 p-3 bg-[#2E343D] flex items-center rounded-lg">
        <label for="imageUploader" className=" bg-gray-500 p-2 rounded-full flex items-center justify-center transition duration-200">
        <FaPlus className="text-[#343434]"/>
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
        <img src={imageURL} className={`ml-2 w-8 h-8 ${imageURL?"block":"hidden"}`} onClick={()=>{
            setImageURL(null)
        }}/>
        <pre
        className="flex-grow block ml-3 border-none bg-transparent text-white placeholder-gray-400 focus:outline-none transition duration-200"
        placeholder="Type a message"
        spellCheck={false}
        autoFocus={true}
        ref={inputRef}
        contentEditable={true}
        onKeyDown={(e)=>{
            if(e.code=="Enter") { 
                e.preventDefault()
                send();
            }
            if(e.key=="@") {
                setListVisible(true)
            }
        }}
        ></pre>
        <button
        onClick={send}>
            Send
        </button>
    </div>
    </section>
    )
}