import React from 'react';

const VoiceControls = () => {
  return (
    <div className="bg-[#282828] p-4 text-white flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
          <span className="text-xl">🎤</span>
        </div>
        <div className="ml-2">
          <p className="font-bold">User123</p>
          <p className="text-sm text-gray-400">#1234</p>
        </div>
      </div>
      <div className="flex space-x-4">
        <button className="bg-gray-700 p-2 rounded hover:bg-gray-600 transition">Mute</button>
        <button className="bg-gray-700 p-2 rounded hover:bg-gray-600 transition">Deafen</button>
      </div>
    </div>
  );
};

export default VoiceControls;
