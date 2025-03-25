import { Event } from "../../interfaces/event.interface";
import serverModel from "../../models/serverModel";

export default async function createEvent(serverID: Number, name:String, organizerID:Number, banner:String, startTime:Number, registerDeadline:Number) {
        try {
            let eventObj:Event = {
                name: name,
                organizerID: organizerID,
                banner:banner,
                startTime: startTime,
                registerDeadline: registerDeadline,
                participants: [organizerID]
            }

            let eventCheck = await serverModel.updateOne({serverID: serverID}, {$push: {events: eventObj}});


            if(eventCheck.modifiedCount!=1) {
                return {type: "ERROR", msg: "Unable to find server! Invalid serverID."};
            } else {
                return {type: "SUCCESS"};
            }
        } catch (err) {
            return {type: "UNDEFINED ERROR", msg:err};
        }
}