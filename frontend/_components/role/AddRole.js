import { useState } from "react";
import Dialog from "../ui/Dialog";

import { FaXmark } from "react-icons/fa6";
import { useRouter } from "next/navigation";


export default function AddRole({setVisible, membersList, serverID}) {

    let [name, setName] = useState("")
    let [color, setColor] = useState("#fff")
    let [assignedMembers, setAssignedMembers] = useState([])  

    let router = useRouter()
    if(!membersList) {
      return <h1>Loading</h1>
    }

    return (
        <Dialog>
        <h3 className="text-lg font-bold flex justify-between items-center mb-4">
              <span>Add role</span>
              <FaXmark className="hover:text-[#888] cursor-pointer" onClick={()=>{setVisible(false)}} />
        </h3>

        <div className="mb-4">
          <label className="block text-sm mb-2">Role Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="new-category"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
          />
          {!name && <p className="text-red-500 text-sm mt-1">Role name is required.</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2">Role Color</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="new-category"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
          />
          {!color && <p className="text-red-500 text-sm mt-1">Role color is required.</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2">Assign role</label>
            <select
             multiple
             className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
             onChange={(e)=>{
              let options = e.target.options
              let nData = [];
              for(let i=0;i<options.length;i++) {
                if(options[i].selected) {
                  nData.push(Number(options[i].value));
                }
              }
              setAssignedMembers(nData);
             }}
             >
              {membersList.map((el)=>{
                return <option className="w-full p-2 my-2 rounded bg-gray-700 border border-gray-600 focus:outline-none" value={el}>{el}</option>
              })}
            </select>
        </div>

        <button
              disabled={!name}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
               onClick={()=>{
                  console.log(assignedMembers);
                  
                fetch("http://localhost:3030/createRole/", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                      serverID: serverID,
                      name: name,
                      color: color,
                      assignedTo: assignedMembers
                    })
              }).then(res=>res.json()).then(data=>{
                console.log(data);
                
                if(data.type=="SUCCESS") {
                    router.refresh()
                }
              })
            
              setVisible(false);
              }}
            >
              Create
            </button>

        </Dialog>
    )
}