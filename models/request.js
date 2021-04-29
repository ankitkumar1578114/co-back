const { Schema, model } = require("mongoose");

const requestSchema = new Schema({

});

module.exports = model("requests", requestSchema);
