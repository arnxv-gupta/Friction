const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Connected!");
});

let serverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    serverIcon: {
        type:String,
        required: true,
    },
    serverID: {
        type: Number,
        default: ()=> Math.floor(Math.random() * (999999999 - 111111111) + 111111111)
    },
    createdAt: {
        type: Number,
        default: ()=>Date.now()
    },
    categories: [],
    membersList: [],
    channels: [],
    adminID: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Server", serverSchema);