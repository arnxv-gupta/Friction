const express = require("express");
const router = express.Router();

const createAccount = require("../controllers/auth/createAccount");
const loginAccount = require("../controllers/auth/loginAccount");

// auth
router.post("/createAccount", async (req, res)=>{
    res.json(await createAccount(req));
});

router.post("/loginAccount", async (req, res)=>{
    res.json(await loginAccount(req))
});

// router.get("/getAuth", (req, res)=>{
//     console.log(req.session.auth);
    
//     if(req.session.auth) {
//         res.json({type: "SUCCESS", msg:"User authenticated.", res: req.session.auth});
//     } else {
//         res.json({type:"ERROR", msg: "User authentication failed!"});
//     }
// })

module.exports = router;