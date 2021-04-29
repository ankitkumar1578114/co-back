const { model, Schema } = require("mongoose");

const hospitalSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    bedsAvailable: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: { // maybe in address, but required for program logic to work easily
        type: String,
        required: true,
        trim: true
    }
});

module.exports = model('hospital', hospitalSchema);
