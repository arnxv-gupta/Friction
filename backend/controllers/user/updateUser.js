const userModel = require("../../models/userModel");
const emitter = require("../../emitter");

async function updateUser(userObj) {
    if(await userModel.updateOne({userID: userObj.userID}, userObj)) {
        console.log("Success");
        emitter.emit("join")
    } else {
        console.log("err", "aasa")
    }
}

module.exports = updateUser;