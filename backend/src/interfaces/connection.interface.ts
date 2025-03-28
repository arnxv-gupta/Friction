export interface Connection {
            channelID: Number,
            connections: [{
                userID: Number,
                peerID: String
            }]
}