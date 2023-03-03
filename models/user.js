const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = mongoose.model(
    "User", new Schema({
        username: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        department: { type: String, required: true },
        studentID: { type: String, required: true },
        role: {
            type: String, required: true,
            enum: ["Admin", "Member"],
            default: "Member",
        },
    })
);

module.exports = User;