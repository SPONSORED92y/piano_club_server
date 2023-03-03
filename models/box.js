const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoxSchema = new Schema({
    state: {
        type: String,
        required: true,
        enum: ["Available", "Occupied", "Unavailable"],
        default: ["Available"]
    },
    user: {
        type: String,
        required: true,
        default: [""]
    }
});

const DaySchema = new Schema({
    day: [BoxSchema]
});

const SevenDaySchema = new Schema({
    sevenDay: [DaySchema]
});

const RoomSchema = new Schema({
    room: [SevenDaySchema]
});

const Weekchema = new Schema({
    week: [RoomSchema]
});

module.exports = mongoose.model("Box", BoxSchema);