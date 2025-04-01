export interface Event {
    name: String,
    organizerID: Number,
    banner: String,
    startTime: Number,
    endTime: Number,
    deadTime: Number,
    participants: [Number],
    location: String,
    eventID?:Number
}