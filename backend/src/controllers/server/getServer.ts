import serverModel from "../../models/serverModel";

export default async function getServer(serverID: Number) {
    try {
        let data = await serverModel.findOne({serverID: Number(serverID)});
        if(data==null) {
            return {type: "ERROR", msg: "Invalid serverID"};
        } else {
            return {type: "SUCCESS", msg: `Server found`, res: data};
        }
    } catch (err) {
        return {type: "UNDEFINED ERROR", msg:err};
    }
}
