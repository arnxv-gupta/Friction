const serverModel = require("../../models/serverModel");

async function getServer(req) {
    
    let data = await serverModel.findOne({serverID: Number(req.query.serverID)});
    //console.log(data);
    
    if(data==null) {
        return {type: "ERROR", msg: "Invalid serverID"};
    } else {
        //console.log(data.channels);
        return {type: "SUCCESS", msg: `Server found`, res: data};
    }
}

module.exports = getServer;