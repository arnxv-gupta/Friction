import serverModel from "../../models/serverModel";
import userModel from "../../models/userModel";

export default async function joinServer(serverID: Number, userID: Number) {
    try {
        let serverObj = await serverModel.findOne({serverID: serverID});

        if(serverObj==null) {
            return {type: "ERROR", msg: "Invalid serverID."};
        } else {
            if(serverObj.membersList.indexOf(Number(userID))==-1) {
                await serverModel.updateOne({serverID: serverID}, {$push: {membersList: Number(userID)}});
                await serverModel.updateOne({serverID: serverID, "roles.name": "everyone"}, {$push: {"roles.$.assignedTo": Number(userID)}})
                await userModel.updateOne({userID: Number(userID)}, {$push: {joinedServers: Number(serverID)}});

                return {type: "SUCCESS", msg: `Server joined!`};

            } else {
                return {type: "ERROR", msg: "Already in server."};
    
            }
        }
    } catch (err) {
        return {type: "UNDEFINED ERROR", msg:err};
    }
}
