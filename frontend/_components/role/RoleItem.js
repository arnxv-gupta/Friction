import { FaUser } from "react-icons/fa6";

export default function RoleItem({name, count, serverID}) {
    return (
        <li className="flex justify-between">
            <span className="flex items-center gap-4 pt-3"><FaUser /> {name} ({count})</span>
            <span><button onClick={()=>{

                fetch(`http://localhost:3030/deleteRole?serverID=${serverID}&name=${name}`, {
                    method: "DELETE"
                }).then(res=>res.json()).then(data=>{
                    console.log(data);
                })
            }}>Delete</button></span>
        </li>
    )
}