import serverModel from "../../models/serverModel";

export default async function joinEvent(serverID: Number, eventID: Number, userID: Number) {
        try {
            let eventCheck = await serverModel.updateOne({serverID: serverID, "events.eventID": eventID}, {$push: {"events.$.participants": userID}});

            if(eventCheck.modifiedCount!=1) {
                return {type: "ERROR", msg: "Unable to find server! Invalid serverID."};
            } else {
                return {type: "SUCCESS"};
            }
        } catch (err) {
            return {type: "UNDEFINED ERROR", msg:err};
        }
}