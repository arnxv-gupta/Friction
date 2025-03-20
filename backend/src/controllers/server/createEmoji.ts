import { Emoji } from "../../interfaces/emoji.interface";
import serverModel from "../../models/serverModel";

export default async function createEmoji(serverID: Number, name:String, src:String) {
    try {
        let emojiObj:Emoji = {
            name: name,
            serverID: serverID,
            src: src
        }

        let emojiCheck = await serverModel.updateOne({serverID: serverID}, {$push: {emojis: emojiObj}});

        if(emojiCheck.modifiedCount==1) {
            return {type: "SUCCESS", msg: "Successfully added the emoji!"};
        } else {
            return {type: "ERROR", msg: "Unable to find server! Invalid serverID."}; 
        }

    } catch (err) {
        return {type: "UNDEFINED ERROR", msg:err};
    }
}