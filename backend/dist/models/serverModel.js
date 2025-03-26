"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const serverSchema = new mongoose_1.Schema({
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
        default: () => Math.floor(Math.random() * (999999999 - 111111111) + 111111111)
    },
    createdAt: {
        type: Number,
        default: () => Date.now()
    },
    categories: [
        {
            name: {
                type: String,
                required: true
            },
            createdAt: {
                type: Number,
                default: () => Date.now()
            },
            categoryID: {
                type: Number,
                default: () => Math.floor(Math.random() * (999999999 - 111111111) + 111111111)
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
                default: () => Math.floor(Math.random() * (999999999 - 111111111) + 111111111)
            },
            assignedTo: [{ type: Number, required: true }],
        }
    ],
    membersList: [Number],
    events: [], //todo
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
                default: () => Math.floor(Math.random() * (999999999 - 111111111) + 111111111)
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
                default: () => Math.floor(Math.random() * (999999999 - 111111111) + 111111111)
            },
            channelID: {
                type: Number,
                default: () => Math.floor(Math.random() * (999999999 - 111111111) + 111111111)
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
            data: [
                {
                    authorID: {
                        type: Number,
                        required: true
                    },
                    timestamp: {
                        type: Number,
                        default: () => Date.now()
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
exports.default = mongoose_1.default.model("Server", serverSchema);
