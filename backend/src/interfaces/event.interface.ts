export interface Event {
    name: String,
    organizerID: Number,
    eventTime: Number,
    registerDeadline: Number,
    resgistered: [Number],
    eventID?:Number
}