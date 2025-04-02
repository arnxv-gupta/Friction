type presenceType = "Offline" | "Online" | "Busy" | "Idle" 

export interface User {
    email: String,
    password: String,
    username: String,
    userID?: Number,
    pfpURL: String,
    createdAt?: Number,
    onlinePresence: presenceType,
    joinedServers: [Number],
    messages: [Number]
}