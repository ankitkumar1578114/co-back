const { Schema, model } = require("mongoose");

const requestSchema = new Schema({
    requesterName: {
        type: String,
        trim: true
    },
    contact: {
        type: String,
        trim: true,
        unique: true,
    },
    requiredThings: {
        type: [String], // for eg. ["Cylinder", "Plasma`"], by default 1 unit of each thing
    }
    // todo: Add more fields
});

// can't use arrow functions here, since it doesn't bind to the 'this' ref of the schema
requestSchema.pre('validate', function(next) {
    // checking if contact is valid

    if( ! /[+91]? *\d{10}/.test(this.contact) ) {
        console.error(`${this.contact} doesn't seem to be a number`);
        throw Error(400);   //  returning the status code, that should be returned (INVALID INPUT)
    }

    // else ok
    next();
});
module.exports = model("requests", requestSchema);
