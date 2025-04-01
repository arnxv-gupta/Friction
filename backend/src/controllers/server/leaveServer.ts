import serverModel from "../../models/serverModel";
import userModel from "../../models/userModel";

export default async function leaveServer(serverID: Number, userID: Number) {
    try {
        let serverObj = await serverModel.findOne({serverID: serverID});
        let userObj = await userModel.findOne({userID: userID});

        if(!userObj || !serverObj) {
            return {type:"ERROR",msg: "Invalid serverID or userID"};
        } else {
            let serverChanged = await serverModel.updateOne({serverID: serverID}, {$pull: {membersList: userID}});
            let userChanged = await userModel.updateOne({userID: userID}, {$pull: {joinedServers: serverID}});
            await serverModel.updateOne({serverID: serverID, "channels.name": "general"}, {$push: {"channels.$.data": {
                authorID: Number(userID),
                type: "system",
                data: "leave"
            }}})
            if(serverChanged.modifiedCount == 1 && userChanged.modifiedCount == 1) {
                return {type: "SUCCESS", msg: "User removed from server"};
            } else {
                return {type:"ERROR",msg: "Unable to leave server!"};
            }
        }
    } catch (err) {
        return {type: "UNDEFINED ERROR", msg:err};
    }
}