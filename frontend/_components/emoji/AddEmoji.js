import Dialog from "../ui/Dialog"

import { FaXmark } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function AddEmoji({setVisible, serverID}) {

    const [name, setName] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null);

    const fileInputRef = useRef(null)

    let router = useRouter()

    const handleFileChange = (e) => {
        let data = new FormData();
        data.append("image", e.target.files[0]);
        fetch("http://localhost:3030/uploadImage", {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.type == "SUCCESS") {
              setSelectedFile(data.res);
            }
            
          });
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
      };

    return (
        <Dialog>
            <h3 className="text-lg font-bold flex justify-between items-center mb-4">
                    <span>Add emoji</span>
                    <FaXmark className="hover:text-[#888] cursor-pointer" onClick={()=>{setVisible(false)}} />
            </h3>

            <div className="mb-4 flex justify-center">
                <div
                    className="w-16 h-16 border-2 border-gray-400 rounded-full flex items-center justify-center cursor-pointer"
                    onClick={handleImageClick}
                >
                {selectedFile ? (
                <img
                src={selectedFile}
                alt="Selected Server Icon"
                className="w-16 h-16 rounded-full object-cover"
                />
                ) : (
                    <span className="text-white text-3xl">+</span>
                )}
                <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-2">Emoji Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Emoji label"
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                />
                {!name && <p className="text-red-500 text-sm mt-1">Emoji name is required.</p>}
            </div>

            <button
              className="bg-[#51956d] text-[#fff] w-full px-4 py-2 rounded cursor-pointer hover:underline"
              onClick={() => {
                fetch("http://localhost:3030/createEmoji", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: name, src: selectedFile, serverID: serverID}),
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    router.push(`/settings/${serverID}`)
                    
                });
                }}>
                Create
          </button>
        </Dialog>
    )
}