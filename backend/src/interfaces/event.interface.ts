export interface Event {
    name: String,
    organizerID: Number,
    banner: String,
    startTime: Number,
    registerDeadline: Number,
    participants: [Number],
    eventID?:Number
}