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
    categories: [
        {
        name: {
            type: String,
            required: true
        },
        createdAt: {
            type: Number,
            default: ()=>Date.now()
        },
        categoryID: {
            type: Number,
            default: ()=>Math.floor(Math.random() * (999999999 - 111111111) + 111111111)
        }
        }
    ],
    membersList: [Number],
    channels: [{
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        categoryID: {
            type: Number,
            required: true
        },
        createdAt: {
            type: Number,
            default: ()=>Math.floor(Math.random() * (999999999 - 111111111) + 111111111)
        },
        channelID: {
            type: Number,
            default: ()=>Math.floor(Math.random() * (999999999 - 111111111) + 111111111)
        },
        data:[
            {
                authorID: {
                    type: Number,
                    required: true
                },
                timestamp: {
                    type: Number,
                    default: ()=>Date.now()
                },
                data: {
                    type: String,
                    required: true,
                },
                image: String  
            }
        ]
    }],
    adminID: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Server", serverSchema);