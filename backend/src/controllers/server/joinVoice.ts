import { connections } from "mongoose";
import { Connection } from "../../interfaces/connection.interface";
import serverModel from "../../models/serverModel";

// incompelte
export default async function joinVoice(serverID:Number, voiceID:Number, userID:Number, peerID: Number) {
        try {

            const existingConnection = await serverModel.findOne({
                serverID: serverID,
                "connections.channelID": voiceID,
                "connections.connections.userID": userID,
              });
          
              if (existingConnection) {
                return { type: "ERROR", msg: "Already in VC!." };
              }

            let voiceObj= {
                userID: userID,
                peerID: peerID
            }

            console.log(serverID, voiceID, userID, peerID);
            

             let serverObj = await serverModel.updateOne({serverID: serverID, "connections.channelID": Number(voiceID) }, {$push: {"connections.$.connections": voiceObj}});
             console.log(serverObj);
             
            if(serverObj.modifiedCount==1) {
                return {type: "SUCCESS", msg: "Joined VC."};
            } else {
                const addedObj = await serverModel.updateOne({serverID: serverID}, {$push: {connections: {channelID: voiceID, connections: voiceObj}}});
                if (addedObj.modifiedCount === 1){
                    return {type: "SUCCESS", msg: "Joined VC."}
                  } else {
                    return { type: "ERROR", msg: "Server not found." };
                  }
            }
        } catch (err) {
            return {type: "UNDEFINED ERROR", msg:err};
        }
}