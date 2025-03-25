import userModel from "../../models/userModel";

export default async function userUpdate(userID:Number, status:String) {
    try {   
        let data = await userModel.updateOne({userID: userID}, {onlinePresence: status});
        if(data==null) {
            return {type: "ERROR", msg: "Invalid userID"};
        } else {
            return {type: "SUCCESS"};
        }
    } catch (err) {
        return {type: "UNDEFINED ERROR", msg:err};
    } 
}