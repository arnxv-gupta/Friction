const serverModel = require("../../models/serverModel");
const userModel = require("../../models/userModel")

async function joinServer(req) {
    //almost works

    let serverObj = await serverModel.findOne({serverID: Number(req.query.serverID)});
    //console.log(serverObj);

    
    if(serverObj==null) {
        return {type: "ERROR", msg: "Invalid serverID."};
    } else {
        if(serverObj.membersList.indexOf(Number(req.query.userID))==-1) {
            await serverModel.updateOne({serverID: serverObj.serverID}, {$push: {membersList: Number(req.query.userID)}});
            await userModel.updateOne({userID: Number(req.query.userID)}, {$push: {joinedServers: Number(req.query.serverID)}});
            
            return {type: "SUCCESS", msg: `Server joined!`};

        } else {
            return {type: "ERROR", msg: "Already in server."};
 
        }
    }
}

module.exports = joinServer;