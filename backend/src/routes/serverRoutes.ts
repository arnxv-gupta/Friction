import express, {Router, Request, Response, request} from "express"

import createServer from "../controllers/server/createServer"
import joinServer from "../controllers/server/joinServer"
import deleteServer from "../controllers/server/deleteServer";
import leaveServer from "../controllers/server/leaveServer";
import getServer from "../controllers/server/getServer";
import createChannel from "../controllers/server/createChannel";
import deleteChannel from "../controllers/server/deleteChannel";
import createCategory from "../controllers/server/createCategory";
import createRole from "../controllers/server/createRole";
import deleteRole from "../controllers/server/deleteRole";
import createEmoji from "../controllers/server/createEmoji";
import deleteEmoji from "../controllers/server/deleteEmoji";
import createEvent from "../controllers/server/createEvent";
import deleteEvent from "../controllers/server/deleteEvent";
import joinVoice from "../controllers/server/joinVoice";
import sendMessage from "../controllers/server/createMessage";

const router:Router = express.Router();

router.post("/createServer", async (req:Request, res:Response)=>{
    res.json(await createServer(req.body.name, req.body.icon, req.body.adminID));
})

router.get("/joinServer", async (req:Request<{}, {}, {}, {serverID: Number, userID: Number}>, res:Response)=>{
    res.json(await joinServer(req.query.serverID, req.query.userID));
})

router.delete("/deleteServer", async (req:Request<{}, {}, {}, {serverID: Number}>, res:Response)=>{
    res.json(await deleteServer(req.query.serverID));
})

router.get("/leaveServer", async (req:Request<{}, {}, {}, {serverID: Number, userID: Number}>, res:Response)=>{
    console.log("123");
    
    res.json(await leaveServer(req.query.serverID, req.query.userID));
})

router.get("/serverInfo", async (req:Request<{}, {}, {}, {serverID: Number}>, res:Response)=>{
    res.json(await getServer(req.query.serverID));
})

router.post("/createChannel", async (req:Request, res:Response)=>{
    res.json(await createChannel(req.body.serverID, req.body.name, req.body.type, req.body.categoryID));
});

router.delete("/deleteChannel", async (req:Request<{}, {}, {}, {serverID: Number, channelID: Number}>, res:Response)=>{
    res.json(await deleteChannel(req.query.serverID, req.query.channelID));
});

router.post("/createCategory", async (req:Request, res:Response)=>{
    res.json(await createCategory(req.body.serverID, req.body.name));
});

router.post("/createRole", async (req:Request, res:Response)=>{
    res.json(await createRole(req.body.serverID, req.body.name, req.body.color, req.body.assignedTo));
})

router.delete("/deleteRole", async (req:Request<{}, {}, {}, {serverID:Number, name:String}>, res:Response)=>{
    res.json(await deleteRole(req.query.serverID, req.query.name));
})

router.post("/createEmoji", async (req:Request, res:Response)=>{
    res.json(await createEmoji(req.body.serverID, req.body.name, req.body.src));
})

router.delete("/deleteEmoji", async (req:Request<{}, {}, {}, {serverID:Number, emojiID:Number}>, res:Response)=>{
    res.json(await deleteEmoji(req.query.serverID, req.query.emojiID));
})

router.post("/createEvent", async (req:Request, res:Response)=>{
    console.log(req.body);
    
    res.json(await createEvent(req.body.serverID, req.body.name, req.body.organizerID, req.body.banner, req.body.startTime, req.body.endTime, req.body.deadTime, req.body.location));
})

router.delete("/deleteEvent", async (req:Request<{}, {}, {}, {serverID:Number, channelID:Number}>, res:Response)=>{
    res.json(await deleteEvent(req.query.serverID, req.query.channelID));
})

router.post("/joinVoice", async (req:Request, res:Response)=>{
    res.json(await joinVoice(req.body.serverID, req.body.voiceID, req.body.userID, req.body.peerID));
})

router.post("/sendMessage", async (req:Request, res:Response)=>{
    res.json(await sendMessage(req.body.authorID, req.body.text, req.body.image, req.body.serverID, req.body.channelID));
});

export default router;