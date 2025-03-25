import serverModel from "../../models/serverModel";

export default async function deleteEvent(serverID:Number, eventID:Number) {
    try {
        let eventCheck = await serverModel.updateOne({serverID: serverID}, {$pull: {events: eventID}});

        if(eventCheck.modifiedCount!=1) {
            return {type: "ERROR", msg: "Unable to find server! Invalid serverID."};
        } else {
            return {type: "SUCCESS"};
        }
    } catch (err) {
        return {type: "UNDEFINED ERROR", msg:err};
    }
}