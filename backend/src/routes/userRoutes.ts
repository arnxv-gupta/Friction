import express, { Router, Request, Response } from "express";

import getUser from "../controllers/user/getUser";
import addFriend from "../controllers/user/addFriend";

const router:Router = express.Router();

router.get("/userInfo", async (req:Request<{}, {}, {}, {userID:Number}>, res:Response)=>{
    res.json(await getUser(req.query.userID));
});

router.get("/addFriend", async (req:Request<{}, {}, {}, {userID:Number, friendID:Number}>, res:Response)=>{
    res.json(await addFriend(req.query.userID, req.query.friendID));
});

export default router;