import mongoose, { Schema } from "mongoose"
import { User } from "../interfaces/user.interface.interface"

const userSchema:Schema<User> = new Schema({
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
        default: "Offline",
    },
    joinedServers: [Number],
    friends: [Number]
})

export default mongoose.model("User", userSchema);