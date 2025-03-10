const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Connected!");
});

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userID: {
        type: Number, 
        default: ()=> Math.floor(Math.random() * (999999999 - 111111111) + 111111111),
    },
    pfpURL: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number, 
        default: ()=> Date.now()
    },
    onlinePresence: {
        type: String,
        default: "offline",
    },
    joinedServers: [Number],
    friends: [Number]
});

module.exports = mongoose.model("User", userSchema);