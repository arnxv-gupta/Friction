import express, { Router, Request, Response } from "express";
import multer from "multer"
import path from "path"
import serverModel from "../models/serverModel";
import { currentUsers } from "..";

const router:Router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./uploads");
    },
    filename: (req, file, cb)=>{
        cb(null, String(Date.now()) + path.extname(file.originalname));
    }
});
const upload = multer({storage});

router.post("/uploadImage", upload.single("image"), (req:Request, res:Response)=>{
    if(req.file==undefined) {
        res.json({type:"ERROR",msg: "Error uploading image!"});
    } else {
        res.json({type:"SUCCESS",msg: "Image uploaded!", res: "http://localhost:3030/uploads/"+req.file.filename});

    }
})

router.get("/api/servers", async (req, res)=>{
    res.json(await serverModel.countDocuments({}));
})

router.get("/api/users", async (req, res)=>{
    res.json(currentUsers);
})

export default router;