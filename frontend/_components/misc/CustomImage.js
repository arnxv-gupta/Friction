import { useState } from "react";
import { FaExpand } from "react-icons/fa6";

export default function CustomImage({src}) {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="group relative">
            <img
                className="rounded max-w-[50vw] md:max-w-[30vw] my-2"
                src={src}
            />
            <span className="hidden cursor-pointer group-hover:block absolute top-0 right-0 bg-[#888] m-2 p-1 rounded" onClick={()=>{setIsExpanded(true)}}>
            <FaExpand />
            </span>

            {isExpanded && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black/80 z-50 flex items-center justify-center cursor-pointer"
          onClick={() => setIsExpanded(false)}
        >
          <img
            src={src}
            alt="Expanded Image"
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()} // Prevent closing on image click
          />
        </div>
      )}
        </div>
    )
}