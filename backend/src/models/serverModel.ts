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
    events: [{
        name: {
            type:String,
            required: true
        },
        organizerID: {
            type: Number,
            required: true
        },
        startTime: {
            type: Number,
            required: true
        },
        endTime: {
            type: Number,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        participants: {
            type: [Number],
            required: true
        },
        location: String,
        eventID: {
            type:Number,
            default: ()=>Math.floor(Math.random() * (999999999 - 111111111) + 111111111)
        },

    }],
    emojis: [{
        name: {
            type: String,
            required: true
        },
        serverID: {
            type: Number,
            required: true
        },
        src: {
            type: String,
            required: true
        }, 
        emojiID: {
            type: Number, 
            default: ()=>Math.floor(Math.random() * (999999999 - 111111111) + 111111111)
        }

    }],
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
        access: [{
            roleID: {
                type: Number,
                required: true
            },
            read: {
                type: Boolean,
                required: true
            },
            write: {
                type: Boolean,
                required: true
            }
        }],
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
    connections: [
    {
        channelID: Number,
            connections: [
                {
                    userID: Number,
                    peerID: String
                }
            ]
    }],
    adminID: {
        type: Number,
        required: true
    }
});

export default mongoose.model("Server", serverSchema)