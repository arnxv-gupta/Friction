const serverModel = require("../../models/serverModel");

async function createRole({serverID, name, color}) {
    try {
        let roleCheck = await serverModel.updateOne({serverID: serverID}, {$push: {roles: {name: name, color: color}}});
        if(roleCheck.modifiedCount==1) {
            return {type: "SUCCESS"};
        } else {
            return {type: "ERROR", msg: "Unable to add role"};
        }
    } catch(err) {
        return {type: "ERROR", msg: err};
    }
}

module.exports = createRole;