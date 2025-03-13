const userModel = require("../../models/userModel");

async function getUser(req) {
    
    let data = await userModel.findOne({userID: Number(req.query.userID)});
    if(data==null) {
        return {type: "ERROR", msg: "Invalid userID"};
    } else {
        return {type: "SUCCESS", msg: `user found`, res: data};
    }
}

module.exports = getUser;