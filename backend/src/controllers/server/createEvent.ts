import { Event } from "../../interfaces/event.interface";
import serverModel from "../../models/serverModel";

export default async function createEvent(serverID: Number, name:String, organizerID:Number, startTime:Number, endTime:Number, deadTime:Number, location:String) {
        try {
            let eventObj:Event = {
                name: name,
                organizerID: organizerID,
                startTime: startTime,
                endTime: endTime,
                deadTime: deadTime,
                location: location,
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