import { Message } from "./message.interface"

export interface Channel {
    name: String,
    type: String
    channelID?: Number,
    categoryID: Number
    createdAt?: Number,
    data?: [Message] | [],
    access: [{roleID: Number, read: Boolean, write: Boolean}] | []
}