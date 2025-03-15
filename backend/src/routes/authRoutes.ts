import express, { Router, Request, Response } from "express";

import createAccount from "../controllers/auth/createAccount"
import loginAccount from "../controllers/auth/loginAccount";

const router:Router = express.Router();

router.post("/createAccount", async (req:Request, res: Response)=>{
    res.json(await createAccount(req.body.email, req.body.password, req.body.username, req.body.pfpImage))
});

router.post("/loginAccount", async (req:Request, res:Response)=>{
    res.json(await loginAccount(req.body.email, req.body.password));
})

export default router;