import { Server } from "../../interfaces/server.interface";
import serverModel from "../../models/serverModel";
import userModel from "../../models/userModel";

export default async function createServer(name:String, icon:String, adminID:Number) {

    try {
        let categoryID = Math.floor(Math.random() * (999999999 - 111111111) + 111111111);

        let serverObj:Server = {
            name: name,
            serverIcon: icon,
            roles: [
                {
                    name: "everyone",
                    color: "#FFFFFF",
                    assignedTo: [adminID]
                }
            ],
            membersList: [adminID],
            categories: [{
                name: "main",
                categoryID: categoryID
            }],
            events: [],
            channels: [{
                name:"general",
                type: "text",
                categoryID: categoryID,
            }
        ],
            adminID: adminID
        }

        let userExists = await userModel.exists({userID: Number(adminID)})

        if(userExists==null) {
            return {type: "ERROR", msg: "Unable to create server! Invalid adminID."};
        } else {
            let server = await serverModel.create(serverObj);
            await userModel.updateOne({userID: Number(adminID)}, {$push: {joinedServers: server.serverID}});

            return {type: "SUCCESS", data: server.serverID};
        }
    } catch (err) {
        return {type: "UNDEFINED ERROR", msg:err};
    }
}
