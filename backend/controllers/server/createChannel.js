const serverModel = require("../../models/serverModel");

async function createChannel(req) {

    console.log(req.body);
    
    let channelObj = {
        name:req.body.name,
        type:req.body.type,
        categoryID: req.body.categoryID,
        data:[]
    }
    //console.log(channelObj);
    
    let nChannelObj = await serverModel.updateOne({serverID: Number(req.body.serverID)}, {$push: {channels: channelObj}});
    //console.log(nChannelObj);
    
    if(nChannelObj.modifiedCount!=1) {
        return {type: "ERROR", msg: "Unable to find server! Invalid serverID."};
    } else {
        return {type: "SUCCESS", data: channelObj.channelID};
    }
}

module.exports = createChannel;