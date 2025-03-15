import { Server } from "../../interfaces/server.interface";
import serverModel from "../../models/serverModel";
import userModel from "../../models/userModel";

// not checked
export default async function deleteServer(serverID:Number) {
    try {
        let serverObj:Server | null = await serverModel.findOne({serverID: serverID});
        if(serverObj==null) {
            return {type:"ERROR",msg: "Server does not exists!"};
        } else {
            serverObj.membersList.forEach(async (el:Number)=>{
                await userModel.updateOne({userID: el}, {$pull: {joinedServers: serverID}});
            })
            await serverModel.deleteOne({serverID: serverID});
            return {type: "SUCCESS", msg: "Deleted the server!"};
        }
    } catch (err) {
        return {type: "UNDEFINED ERROR", msg:err};
    }
}