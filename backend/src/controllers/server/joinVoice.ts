import serverModel from "../../models/serverModel";

// incompelte
export default async function joinVoice(serverID:Number, voiceID:Number, userID:Number) {
        try {
             let serverObj = await serverModel.updateOne({serverID: serverID, "channels.channelID": Number(voiceID) }, {$push: {"channels.$.data": userID}});
            if(serverObj.modifiedCount==1) {
                return {type: "ERROR", msg: "Invalid serverID."};
            } else {
                return {type: "ERROR", msg: "Already in server."};
            }
        } catch (err) {
            return {type: "UNDEFINED ERROR", msg:err};
        }
}