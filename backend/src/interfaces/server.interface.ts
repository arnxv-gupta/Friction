import { Category } from "./category.interface"
import { Channel } from "./channel.interface"
import { Emoji } from "./emoji.interface"
import { Role } from "./role.interface"

export interface Server {
    name: String,
    serverIcon: String,
    serverID?: Number,
    createdAt?: Number
    events: [Event] | [],
    roles: [Role],
    emojis: [Emoji] | [],
    membersList: [Number],
    categories: [Category],
    channels: [Channel],
    adminID: Number
}