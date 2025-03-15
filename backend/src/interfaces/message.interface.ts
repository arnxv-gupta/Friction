import { Reaction } from "./reaction.interface"

type messageType = "default" | "event"

export interface Message {
    authorID: Number
    timestamp?: Number,
    data: String
    type: String
    image?: String,
    reactions: [Reaction] | []
}