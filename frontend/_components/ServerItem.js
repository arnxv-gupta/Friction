import Link from "next/link";
import { useEffect, useState } from "react";

export default function ServerItem({id, link}) {

    const [data, setData] = useState(null);

    useEffect(()=>{
        if(id!=null) 
        fetch(`http://localhost:3030/serverInfo?serverID=${id}`).then(res=>res.json()).then(data=>{
            setData(data.res);
        })
    }, [])

    return (
        <li className="w-12 h-12 my-2">
            <Link href={link}>
                <img
                src={(id!=null)?(data?data.serverIcon:null):"/image.png"}
                alt={id}
                width={48}
                height={48}
                className="object-contain opacity-100 transition rounded-xl hover:rounded-sm" 
            />
            </Link>
        </li>
    )
}