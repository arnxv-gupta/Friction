import userModel from "../../models/userModel";

export default async function getUser(userID:Number) {
    try {
        let data = await userModel.findOne({userID: Number(userID)});
        if(data==null) {
            return {type: "ERROR", msg: "Invalid userID"};
        } else {
            return {type: "SUCCESS", msg: `user found`, res: data};
        }
    } catch (err) {
        return {type: "UNDEFINED ERROR", msg:err};
    } 
}