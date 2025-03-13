const userModel = require("../../models/userModel")

async function createAccount(req) { 


    if(await userModel.exists({email: req.body.email})) {
        // user already exists
        return {type:"ERROR",msg: "User already exists!"};
    } else {
        // missing tag (#)
        let userObj = {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            pfpURL: req.body.pfpImage,
        }

        await userModel.create(userObj);

        return {type: "SUCCESS", msg: "Created new user."};
    }
}

module.exports = createAccount;