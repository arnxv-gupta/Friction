import express, {Router, Request, Response, request} from "express"

import createServer from "../controllers/server/createServer"
import joinServer from "../controllers/server/joinServer"
import deleteServer from "../controllers/server/deleteServer";
import leaveServer from "../controllers/server/leaveServer";
import getServer from "../controllers/server/getServer";
import createChannel from "../controllers/server/createChannel";
import deleteChannel from "../controllers/server/deleteChannel";
import createCategory from "../controllers/server/createCategory";
import sendMessage from "../controllers/server/createMessage";

const router:Router = express.Router();

router.post("/createServer", async (req:Request, res:Response)=>{
    res.json(await createServer(req.body.name, req.body.icon, req.body.adminID));
})

router.get("/createServer", async (req:Request<{}, {}, {}, {serverID: Number, userID: Number}>, res:Response)=>{
    res.json(await joinServer(req.query.serverID, req.query.userID));
})

router.delete("/deleteServer", async (req:Request<{}, {}, {}, {serverID: Number}>, res:Response)=>{
    res.json(await deleteServer(req.query.serverID));
})

router.get("/deleteServer", async (req:Request<{}, {}, {}, {serverID: Number, userID: Number}>, res:Response)=>{
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

router.post("/sendMessage", async (req:Request, res:Response)=>{
    res.json(await sendMessage(req.body.authorID, req.body.text, req.body.image, req.body.serverID, req.body.channelID));
});

export default router;