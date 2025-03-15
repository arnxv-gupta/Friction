"use client"

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { appContext } from "../server/ServerWindow";
import { socketContext } from '@/app/layout';

import { FaXmark } from "react-icons/fa6";

import Dialog from "../ui/Dialog";

export default function AddCategory({isVisible, setVisible}) {
  const [categoryName, setCategoryName] = useState("");

  const data = useContext(appContext);
  let router = useRouter()
  let {sendMessage} = useContext(socketContext)

  if(isVisible==false)
    return;

  return (
    <Dialog>
        <h3 className="text-lg font-bold flex justify-between items-center mb-4">
              <span>Add category</span>
              <FaXmark className="hover:text-[#888] cursor-pointer" onClick={()=>{setVisible(false)}} />
        </h3>

        <div className="mb-4">
          <label className="block text-sm mb-2">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="new-category"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
          />
          {!categoryName && <p className="text-red-500 text-sm mt-1">Category name is required.</p>}
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={()=>[
            setVisible(false)
          ]} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded mr-2">
            Cancel
          </button>

            <button
              disabled={!categoryName}
              className={`${
                categoryName
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-500 cursor-not-allowed"
              } px-4 py-2 rounded`}
               onClick={()=>{
                fetch("http://localhost:3030/createCategory/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: categoryName,
                        serverID: Number(data.serverID)
                    })
                }).then(res=>res.json()).then(data=>{
                  console.log(data);
                  
                  if(data.type=="SUCCESS") {
                      sendMessage("CATEGORY ADDED!");
                  }
                })
            
              setVisible(false);
              setCategoryName("");

               }}
            >
              Next
            </button>

        </div>
    </Dialog>
  );
}
