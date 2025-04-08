export interface Event {
    name: String,
    desc: String,
    organizerID: Number,
    startTime: Number,
    endTime: Number,
    participants: [Number],
    location: String,
    eventID?:Number
}