import { Message } from "../../interfaces/message.interface";
import serverModel from "../../models/serverModel";

export default async function sendMessage(authorID:Number, text:String, image:String|null|undefined, serverID:Number, channelID:Number) {

    try {
        let chatObj:Message;
        if(image) {
        chatObj = {
                authorID: authorID,
                data: text,
                image: image,
                type: "default",
                reactions: []
            }
        } else {
            chatObj = {
                authorID: authorID,
                data: text,
                type: "default",
                reactions: []
            }
        }

        let data = await serverModel.findOne({serverID: Number(serverID), "channels.channelID": Number(channelID)});
        if(data!=null) {
            let channel= await serverModel.findOne({serverID: data.serverID, "channels.channelID": Number(channelID)});
            if(channel!=null) {
                await serverModel.updateOne({serverID: data.serverID, "channels.channelID": Number(channelID) }, {$push: {"channels.$.data": chatObj}});
                return {type: "SUCCESS", msg: `Chat sent!`};
            } else {
                return {type: "ERROR", msg: "Invalid channelID"};
            }
        } else {
            return {type: "ERROR", msg: "Invalid serverID"};
        }
    } catch (err) {
        return {type: "UNDEFINED ERROR", msg:err};
    }
}