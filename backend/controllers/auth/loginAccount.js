const userModel = require("../../models/userModel");

async function loginAccount(req) {
   
    if(!await userModel.exists({email:req.body.email, password:req.body.password})) {
        //error
        return {type:"ERROR", msg: `Unable to login! Email or password was invalid.`};
    } else {
        let user = await userModel.findOne({email:req.body.email, password:req.body.password});
        return {type: "SUCCESS", msg: `Logged in!`, res: user.userID};
    }
}

module.exports = loginAccount;