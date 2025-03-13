const serverModel = require("../../models/serverModel");

async function joinVoice(serverID, channelID, userID) {

    let channelExists = await serverModel.exists({serverID: Number(serverID), "channels.channelID": Number(channelID)});

    if(channelExists) {
        if(await serverModel.findOne({serverID: Number(serverID), "channels.channelID": Number(channelID)})) {
            return {type: "ERROR", msg: `Already in channel!`};
        } else {
            await serverModel.updateOne({serverID: Number(serverID), "channels.channelID": Number(channelID) }, {$push: {"channels.$.data": Number(userID)}});
            return {type: "SUCCESS", msg: `Voice joined!`};
        }
    } else {
        return {type: "ERROR", msg: `Invalid server or channel ID!`};
    }
    
}

module.exports = joinVoice;