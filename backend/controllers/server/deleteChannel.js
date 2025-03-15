const serverModel = require("../../models/serverModel");

async function deleteChannel(serverID, channelID) {
    try {

        //this is wrong
        let isDeleted = await serverModel.deleteOne({serverID: serverID, "channels.channelID": channelID});

        if(isDeleted.deletedCount==1) { 
            return {type: "SUCCESS"};
        } else {
            return {type: "ERROR", msg: "Channel does not exist!"};
        }
    } catch (err) {
        return {type: "ERROR", msg: err};
    }
}

module.exports = deleteChannel;