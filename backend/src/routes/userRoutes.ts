import express, { Router, Request, Response } from "express";

import getUser from "../controllers/user/getUser";
import createMessage from "../controllers/user/createMessage";

const router:Router = express.Router();

router.get("/userInfo", async (req:Request<{}, {}, {}, {userID:Number}>, res:Response)=>{
    res.json(await getUser(req.query.userID));
});

router.get("/createMessage", async (req:Request<{}, {}, {}, {userID:Number, receiverID:Number}>, res:Response)=>{
    res.json(await createMessage(req.query.userID, req.query.receiverID));
});

export default router;