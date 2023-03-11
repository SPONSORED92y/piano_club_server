const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    studentID: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Member"],
        default: "Member",
    },
    times: { type: Number, required: true }
});

module.exports = mongoose.model("User", UserSchema);