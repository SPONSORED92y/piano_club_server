const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BoxSchema = new Schema({
    name: String,
    data: [String]
});

module.exports = mongoose.model("Box", BoxSchema);