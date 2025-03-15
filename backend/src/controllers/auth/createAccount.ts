import userModel from "../../models/userModel";

export default async function createAccount(email:String, password:String, username:String, pfpURL:String) {
    try {
        if(await userModel.exists({email: email})) {
            return {type:"ERROR",msg: "User already exists!"};
        } else {
            await userModel.create({email: email, password: password, username: username, pfpURL: pfpURL});
            return {type: "SUCCESS", msg: "Created new user!"};
        }
    } catch (err) {
        return {type: "UNDEFINED ERROR", msg:err};
    }
}