import { FaUser } from "react-icons/fa6";

export default function RoleItem({name, count, serverID}) {
    return (
        <tr>
            <td className="flex items-center gap-4 pt-3"><FaUser /> {name}</td>
            <td className="pt-3">{count}</td>
            <td><button onClick={()=>{

                fetch(`http://localhost:3030/deleteRole?serverID=${serverID}&name=${name}`, {
                    method: "DELETE"
                }).then(res=>res.json()).then(data=>{
                    console.log(data);
                })
            }}>Delete</button></td>
        </tr>
    )
}