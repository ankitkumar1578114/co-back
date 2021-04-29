const { Schema, Model } = require("mongoose");

const supplierSchema = new Schema({
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
    rate: {
		type: Number,
		required: true,
	},
    maxSupply:{
        type: Number,
		required: true,	     
    }
    
        
});

module.exports = Model("supplier", supplierSchema);
