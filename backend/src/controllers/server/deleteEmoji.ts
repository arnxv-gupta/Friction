import serverModel from "../../models/serverModel";

export default async function deleteEmoji(serverID:Number, emojiID:Number) {
    try {

        let emojiCheck = await serverModel.updateOne({serverID: serverID}, {$pull: {emojis: {emojiID: emojiID}}});

        if(emojiCheck.modifiedCount!=1) {
            return {type: "ERROR", msg: "Invalid serverID or emojiID"};
        } else {
            return {type: "SUCCESS", msg: "Deleted the emoji!"};
        }
    } catch (err) {
        return {type: "UNDEFINED ERROR", msg:err};
    }
}