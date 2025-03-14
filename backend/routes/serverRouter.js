const express = require("express");
const router = express.Router();

const getServer = require("../controllers/server/getServer");
const joinServer = require("../controllers/server/joinServer");
const createServer = require("../controllers/server/createServer");
const sendMessage = require("../controllers/server/createMessage");
const createChannel = require("../controllers/server/createChannel");
const createCategory = require("../controllers/server/createCategory");
const joinVoice = require("../controllers/server/joinVoice");
const createRole = require("../controllers/server/createRole");

router.post("/createServer", async (req, res)=>{
    res.json(await createServer(req));
});

router.delete("/deleteServer", async (req, res)=>{
    //
})

router.get("/joinServer", async (req, res)=>{
    res.json(await joinServer(req));
});

router.delete("/leaveServer", async (req, res)=>{
    //
})

router.post("/createChannel", async (req, res)=>{
    res.json(await createChannel(req));
});

router.delete("/deleteChannel", async (req, res)=>{
    //
});

router.post("/createCategory", async (req, res)=>{
    res.json(await createCategory(req));
});

router.delete("/deleteCategory", async (req, res)=>{
    //
});

// info
router.get("/serverInfo", async (req, res)=>{
    res.json(await getServer(req));
});

router.post("/sendMessage", async (req, res)=>{
    res.json(await sendMessage(req));
});

router.post("/joinVoice", async (req, res)=>{
    res.json(await joinVoice(req.body.serverID, req.body.channelID, req.body.userID));
});

router.post("/createRole", async (req, res)=>{
    res.json(await createRole(req.body.serverID, req.body.name, req.body.color));
})

module.exports=router;