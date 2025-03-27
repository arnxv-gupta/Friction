import { Message } from "./message.interface"

interface UserJoin {
    userID: Number,
    peerID: Number
}

export interface Channel {
    name: String,
    type: String
    channelID?: Number,
    categoryID: Number
    createdAt?: Number,
    data?: [Message] | [UserJoin] | [],
    access: [{roleID: Number, read: Boolean, write: Boolean}] | []
}