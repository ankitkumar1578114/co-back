const { model, Schema } = require("mongoose");

const medicineSchema = Schema({
    medicineName: {
        type: String,
        trim: true,
        required: true,
        unique: false   // there can be many records named "remdesivir"
    },
    quantity: {
        type: Number,
        required: true
    },
    pharmaAddress: {
        type: String,
        required: true,
        trim: true
    },
    pharmaContact: {
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

module.exports = model('medicine', medicineSchema);
