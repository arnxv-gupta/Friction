import mongoose, { Schema } from "mongoose"
import { Server } from "../interfaces/server.interface"

const serverSchema: Schema<Server> = new Schema({
    name: {
        type: String,
        required: true
    },
    serverIcon: {
        type: String,
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
    roles: [
        {
            name: {
                type: String,
                required: true
            },
            color: {
                type: String,
                required: true
            },
            roleID: {
                type: Number,
                default: ()=>Math.floor(Math.random() * (999999999 - 111111111) + 111111111)
            },
            assignedTo: [{type: Number, required:true}],
        }
    ],
    membersList: [Number],
    events: [], //todo
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
                type: {
                    type: String,
                    default: "text"
                },
                image: String,
                reactions: [String]
            }
        ]
    }],
    adminID: {
        type: Number,
        required: true
    }
});

export default mongoose.model("Server", serverSchema)