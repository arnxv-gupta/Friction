import express, { Router, Request, Response } from "express";

import getUser from "../controllers/user/getUser";
import createInbox from "../controllers/user/createInbox";

const router:Router = express.Router();

router.get("/userInfo", async (req:Request<{}, {}, {}, {userID:Number}>, res:Response)=>{
    res.json(await getUser(req.query.userID));
});

router.get("/createInbox", async (req:Request<{}, {}, {}, {userID:Number, receiverID:Number}>, res:Response)=>{
    res.json(await createInbox(req.query.userID, req.query.receiverID));
});

export default router;