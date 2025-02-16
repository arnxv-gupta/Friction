const express = require("express");
const router = express.Router();

const getServer = require("../controllers/getServer");
const joinServer = require("../controllers/joinServer");
const createServer = require("../controllers/createServer");
const sendMessage = require("../controllers/sendMessage");
const createChannel = require("../controllers/createChannel");
const createCategory = require("../controllers/createCategory");
const joinVoice = require("../controllers/joinVoice");

router.post("/createServer", async (req, res)=>{
    res.json(await createServer(req));
});

router.get("/joinServer", async (req, res)=>{
    res.json(await joinServer(req));
});

router.post("/createChannel", async (req, res)=>{
    res.json(await createChannel(req));
});

router.post("/createCategory", async (req, res)=>{
    res.json(await createCategory(req));
});

// info
router.get("/serverInfo", async (req, res)=>{
    res.json(await getServer(req));
});

router.post("/sendMessage", async (req, res)=>{
    res.json(await sendMessage(req));
})

router.post("/joinVoice", async (req, res)=>{
    res.json(await joinVoice(req.body.serverID, req.body.channelID, req.body.userID));
})

module.exports=router;