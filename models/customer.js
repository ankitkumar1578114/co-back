const { Schema, Model } = require("mongoose");

const costomerSchema = new Schema({
	nameOfSupplier: {
		type: String,
		required: true,
		trim: true
	},
    addressOfSupplier: {
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

module.exports = Model("costomer", supplierSchema);
