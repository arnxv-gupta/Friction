const express = require("express");
const router = express.Router();

const getUser = require("../controllers/user/getUser");
const addFriend = require("../controllers/user/addFriend");

router.get("/userInfo", async (req, res)=>{
    res.json(await getUser(req));
});

router.get("/addFriend", async (req, res)=>{
    res.json(await addFriend(req.query.userID, req.query.friendID));
});

router.delete("/removeFriend", async (req, res)=>{
    //
})


module.exports = router;