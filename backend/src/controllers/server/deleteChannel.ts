import serverModel from "../../models/serverModel";

export default async function deleteChannel(serverID:Number, channelID:Number) {
    try {
      let channelDel =  await serverModel.updateOne({serverID: serverID}, {$pull: {"channels.channelID": channelID}});
        if(channelDel.modifiedCount==1) {
            return {type: "SUCCESS", msg: "Deleted the channel!"};

        } else {
            return {type:"ERROR",msg: "ChannelID is invalid!"};
        }
    } catch (err) {
        return {type: "UNDEFINED ERROR", msg:err};
    }
}