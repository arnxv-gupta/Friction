import { log } from "console";
import serverModel from "../../models/serverModel";

export default async function deleteRole(serverID:Number, name:String) {

        try {
            let deleteCheck = await serverModel.updateOne({serverID: serverID}, {$pull: {roles: {name: name}}});
            if(deleteCheck.modifiedCount==1) {
                return {type: "SUCCESS", msg: "Deleted the role!"};
            } else {
                return {type:"ERROR",msg: "RoleID does not exists!"};
            }
            
        } catch (err) {
            return {type: "UNDEFINED ERROR", msg:err};
        }
}