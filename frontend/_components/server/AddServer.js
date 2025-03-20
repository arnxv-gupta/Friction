import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';
import Dialog from '../ui/Dialog';

const AddServer = () => {
  const router = useRouter()

  const [selectedFile, setSelectedFile] = useState(null);
  const serverNameRef = useRef(null);
  const fileInputRef = useRef(null); 

  const handleBackClick = () => {
    
  }

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
      <h3 className="text-lg font-bold flex justify-between text-center items-center mb-4">
        <div>
            <span>Customize your server</span>
            <p className="text-sm text-center mb-4 text-gray-300">Give your new server a personality with a name and an icon. You can always change it later.</p>
        </div>
      </h3>
      <div className="flex justify-center items-center mb-4 relative">     
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
      <label className="block text-white text-sm font-semibold mb-2">Server Name</label>
      <input type="text" className="w-full p-2 bg-gray-600 text-white rounded-lg shadow-md mb-4" placeholder="Enter server name" ref={serverNameRef} />
      <div className="flex justify-between mt-auto">
        <button className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gray-500 transition duration-200" onClick={handleBackClick}>Back</button>
        <button className="bg-[#5865F2] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-[#4853d4] transition duration-200" onClick={() => {
          fetch("http://localhost:3030/createServer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: serverNameRef.current.value,icon: selectedFile, adminID: localStorage.getItem("userID") }),
          })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            
            if(data.type=="SUCCESS") {
              router.push(`/channels/${data.data}`)
            }
          });
        }}>
          Create
        </button>
      </div>
    </Dialog>
  );
};

export default AddServer;
