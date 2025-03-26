import { Channel } from "../../interfaces/channel.interface";
import serverModel from "../../models/serverModel";

export default async function createChannel(serverID: Number, name: String, type: String, categoryID: Number) {
    try {
        let channelObj:Channel = {
            name: name,
            type:type,
            categoryID: categoryID,
            data:[],
            access: []
        }
    
        let channelInsert = await serverModel.updateOne({serverID: Number(serverID)}, {$push: {channels: channelObj}});

        if(channelInsert.modifiedCount!=1) {
            return {type: "ERROR", msg: "Unable to find server! Invalid serverID."};
        } else {
            return {type: "SUCCESS", data: channelObj.channelID};
        }
    } catch (err) {
        return {type: "UNDEFINED ERROR", msg:err};
    }
}