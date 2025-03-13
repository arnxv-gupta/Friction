const userModel = require("../../models/userModel");

async function addFriend(userID, friendID) {
    console.log(userID);
    
    try {
        if(await userModel.exists({userID:userID})) {
            console.log(await userModel.updateOne({userID: userID}, {$push: {friends: Number(friendID)}}));
            return {type: "SUCCESS"};
        } else {
            return {type: "ERROR", msg: "Unable to find user! Invalid userID."};
        }
    } catch(err) {
        console.log(err);
        
    }
}

module.exports = addFriend;