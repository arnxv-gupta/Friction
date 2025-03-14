const serverModel = require("../../models/serverModel");
const userModel = require("../../models/userModel");

async function createServer(req) {

    let categoryID = Math.floor(Math.random() * (999999999 - 111111111) + 111111111);

    let serverObj = {
        name: req.body.name,
        serverIcon: req.body.icon,
        roles: [
            {
                name: "cool ppl",
                color: "#00FF00",
                assignedTo: [req.body.adminID]
            },
            {
                name: "everyone",
                color: "#FFFFFF",
                assignedTo: [req.body.adminID]
            }
        ],
        membersList: [req.body.adminID],
        categories: [{
            name: "main",
            categoryID: categoryID
        }],
        channels: [{
            name:"general",
            type: "text",
            categoryID: categoryID,
        }
    ],
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