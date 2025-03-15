import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';

const ServerDialogue = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1); 
  const [isNotSure, setIsNotSure] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const containerRef = useRef(null);
  const serverNameRef = useRef(null);
  const fileInputRef = useRef(null); 

  const handleOptionClick = () => {
    setCurrentStep(2); 
    setIsNotSure(false);
    containerRef.current.style.maxHeight = '1000px';
  };

  const handleNotSureClick = () => {
    setIsNotSure(true);
    containerRef.current.style.maxHeight = '1000px';
  };

  const handleBackClick = () => {
    if (isNotSure) setIsNotSure(false);
    else if (currentStep === 3) {
      setCurrentStep(2);
      containerRef.current.style.maxHeight = '1000px';
    } else if (currentStep === 2) {
      setCurrentStep(1); 
      containerRef.current.style.maxHeight = '500px'; 
    }
  };

  const handleNextToServerName = () => {
    setCurrentStep(3); 
    setIsNotSure(false); 
  };

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
            localStorage.setItem("serverImage", data.res);
          }
        });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full absolute">
      <div
        ref={containerRef}
        className={`w-full max-w-md p-6 bg-gray-700 rounded-lg shadow-lg relative flex flex-col transition-all duration-300 ${currentStep !== 1 || isNotSure ? 'max-h-[1000px]' : 'max-h-[500px]'} overflow-hidden`}
        style={{ transition: 'max-height 0.3s ease-in-out' }}
      >
        {currentStep === 1 && !isNotSure ? (
          <>
            <h2 className="text-3xl font-bold text-white text-center mb-4">Create Your Server</h2>
            <p className="text-md font-medium text-center mb-4 text-gray-300">Your Server is where you and your friends hang out. Make yours and start talking.</p>
            <div className="flex flex-col space-y-4 overflow-y-auto hide-scrollbar flex-grow mb-2">
              {['Create my own Server', 'Gaming', 'School club', 'Study Group', 'Friends', 'Artists', 'Local Community'].map((item, index) => (
                <div key={index} className="w-full p-4 bg-gray-600 text-white rounded-lg flex justify-between items-center hover:bg-gray-500 transition duration-200 cursor-pointer shadow-md" onClick={handleOptionClick}>
                  <p className="font-semibold">{item}</p>
                  <p className="text-xl">{'>'}</p>
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <p className="text-sm text-gray-400 text-center mb-2">Already have an invite?</p>
              <button className="w-full bg-gray-600 text-white py-3 rounded-lg shadow-lg hover:bg-gray-500 transition duration-200">Join the Server</button>
            </div>
          </>
        ) : currentStep === 2 && !isNotSure ? (
          <>
            <h2 className="text-2xl font-bold text-white text-center mb-4">Tell Us More About Your Server</h2>
            <p className="text-md font-medium text-center mb-4 text-gray-300">In order to help you with your setup, is your new server for just a few friends, or a larger community?</p>
            <div className="flex flex-col space-y-4 mb-4">
              <div className="w-full p-4 bg-gray-600 text-white rounded-lg flex justify-between items-center shadow-md hover:bg-gray-500 cursor-pointer" onClick={handleNextToServerName}>
                <p className="font-semibold">For me and my friends</p>
              </div>
              <div className="w-full p-4 bg-gray-600 text-white rounded-lg flex justify-between items-center shadow-md hover:bg-gray-500 cursor-pointer" onClick={handleNextToServerName}>
                <p className="font-semibold">For club and community</p>
              </div>
              <div className="w-full p-4 bg-gray-200 text-gray-800 rounded-lg flex justify-center items-center shadow-md hover:bg-gray-300 cursor-pointer" onClick={handleNotSureClick}>
                <p className="font-semibold">Not Sure? You can Skip</p>
              </div>
            </div>
            <div className="flex justify-between mt-auto">
              <button className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gray-500 transition duration-200" onClick={handleBackClick}>Back</button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white text-center mb-4">Customize Your Server</h2>
            <p className="text-md font-medium text-center mb-4 text-gray-300">Give your new server a personality with a name and an icon. You can always change it later.</p>
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
                  body: JSON.stringify({ name: serverNameRef.current.value,icon: localStorage.getItem("serverImage"), adminID: localStorage.getItem("userID") }),
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
          </>
        )}
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ServerDialogue;
