import { User } from "../../interfaces/user.interface.interface";
import userModel from "../../models/userModel";

export default async function loginAccount(email:String, password:String) {
    try {
        if(!await userModel.exists({email: email, password: password})) {
            return {type:"ERROR", msg: `Unable to login! Email or password was invalid.`};
        } else {
            let user:User | null = await userModel.findOne({email: email, password: password});
            return {type: "SUCCESS", msg: `Logged in!`, res: user?.userID};
        }
    } catch (err) {
        return {type: "UNDEFINED ERROR", msg:err};
    }
}