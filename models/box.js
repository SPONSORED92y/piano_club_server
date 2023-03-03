const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoxDchema = new Schema({
    data: [
        [
            [
                [
                    {
                        state: {
                            Type: String,
                            required: true,
                            enum: ["Available", "Occupied", "Unavailable"],
                            defaullt: ["Available"]
                        },
                        user: {
                            Type: String,
                            required: true,
                            defaullt: [""]
                        }
                    }
                ]
            ]
        ]
    ],
});

module.exports = mongoose.model("Box", Box);