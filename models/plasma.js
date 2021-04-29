const { Schema, model } = require("mongoose");

const plasmaSchema = new Schema({
    documentType: {
        type: String,
        lowercase: true,    // so that "Receiver" and "receiver" treated same way
        enum: ["receiver", "doner"],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = model("plasma", plasmaSchema);
