const serverModel = require("../models/serverModel");
const userModel = require("../models/userModel");

async function createServer(req) {

    let serverObj = {
        name: req.body.name,
        serverIcon: req.body.icon,
        membersList: [req.body.adminID],
        channels: [{
            name:"general",
            createdAt: Date.now(),
            channelID: Math.floor(Math.random() * (999999999 - 111111111) + 111111111),
            data:[]
        }],
        adminID: req.body.adminID
    }

    let userObj = await userModel.findOne({userID: Number(req.body.adminID)})
    //console.log(userObj);
    if(userObj==null) {
        // error userID not found
        return {type: "ERROR", msg: "Unable to create server! Invalid adminID."};
    } else {
        let server = await serverModel.create(serverObj);
        await userModel.updateOne({userID: Number(req.body.adminID)}, {$push: {joinedServers: server.serverID}});

        return {type: "SUCCESS", data: server.serverID};
    }
}

module.exports = createServer;