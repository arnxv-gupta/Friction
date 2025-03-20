import { Role } from "../../interfaces/role.interface";
import serverModel from "../../models/serverModel";

export default async function createRole(serverID:Number, name:String, color:String, assignedTo:[Number]) {
    try {
        let roleObj:Role = {
            name: name,
            color: color,
            assignedTo: assignedTo
        };

        let roleCheck = await serverModel.updateOne({serverID: serverID}, {$push: {roles: roleObj}});
        if(roleCheck.modifiedCount==1) {
            return {type: "SUCCESS", msg:"Role created!"};  
        } else {
            return {type: "ERROR", msg: "Unable to find server! Invalid serverID."};
        }
    } catch (err) {
        return {type: "UNDEFINED ERROR", msg:err};
    }
}