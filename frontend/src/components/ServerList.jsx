import React, { useEffect, useRef } from 'react';

const servers = ['🏠', '🕹️', '🎮', '📚', '🛠️'];

const ServerList = () => {
  
  return (
    <div className="w-16 h-screen bg-[#282828] flex flex-col items-center py-4 space-y-3">
      {servers.map((server, index) => (
        <div key={index} className="bg-gray-800 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition duration-200 transform hover:bg-gray-600 hover:scale-110">
          <span className="text-white text-2xl">{server}</span>
        </div>
      ))}

      <div 
      className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition duration-200 transform hover:bg-gray-600 hover:scale-110"
      onClick={()=>{
        fetch("http://localhost:3030/createServer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: "Test sercer",
            adminID: localStorage.getItem("userID")
          })
        }).then(res=>res.text()).then(data=>{
          console.log(data);
          
        })
      }}
      >
      <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition duration-200 transform hover:bg-gray-600  rounded-md hover:scale-110">
        <span className="text-white text-2xl">+</span>
      </div>
  </div>
  </div>
  );
}

export default ServerList;
