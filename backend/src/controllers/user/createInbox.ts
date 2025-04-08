import userModel from "../../models/userModel";

export default async function createInbox(userID:Number, receiverID:Number) {
    try {
        if(await userModel.exists({userID:userID})) {
            console.log(await userModel.updateOne({userID: userID}, {$push: {messages: Number(receiverID)}}));
            return {type: "SUCCESS"};
        } else {
            return {type: "ERROR", msg: "Unable to find user! Invalid userID."};
        }
    } catch(err) {
        return {type: "UNDEFINED ERROR", msg:err};
    }
}