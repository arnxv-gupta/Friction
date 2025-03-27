"use client"

import { useContext, useRef, useState } from 'react';

import {appContext} from "../server/ServerWindow"
import { socketContext } from '@/app/layout';
import MentionItem from '../misc/MentionItem';
import * as Icons from "@mielo-ui/adwaita-symbolic-icons-react"

import EmojiList from '../emoji/EmojiList';

export default function ChatInput({userID, serverID, chatID}) {

    const {sendMessage} = useContext(socketContext);
    const data = useContext(appContext)

    const [imageURL, setImageURL] = useState(null)
    const inputRef = useRef(null);

    const [isListVisible, setListVisible] = useState(false);
    const [isEmojiVisible, setEmojiVisible] = useState(false);
    function send() {
        if(inputRef.current.innerText.length==0 || inputRef.current.innerText==null) {
            console.log("Unable to sent empty message");
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
        <div className="mx-3 px-5 bg-[#EAEAEA] dark:bg-[#404040] flex items-center rounded-lg">
        <label for="imageUploader" className="group cursor-pointer p-1 rounded-full flex items-center justify-center">
        <Icons.Actions.TabNew className="icon" />
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
            className="flex-grow block ml-3 border-none py-2 placeholder-black focus:outline-[#1c71d8] dark:focus:outline-[#78aeed] bg-transparent dark:text-white dark:placeholder-gray-400 focus:outline-none transition duration-200"
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
                if(e.key=="Backspace" && isListVisible) {
                    setListVisible(false)
                }
            
        }}
        ></pre>
        <button
        onClick={()=>{
            setEmojiVisible(true)
        }}>
            <Icons.Categories.EmojiPeople className="icon size-5" />
        </button>
    </div>
    </section>
    )
}