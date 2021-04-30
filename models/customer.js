const { Schema, model } = require("mongoose");

const customerSchema = new Schema({
	nameOfCustomer: {
		type: String,
		required: true,
		trim: true
	},
    addressOfCustomer: {
		type: String,
		required: true,
		trim: true
	},
    contact :{
        type: String,
		required: true,
		unique: true
    },
    email:{
        type: String,
		required: false
    },
    
});

module.exports = model("customer", customerSchema);
