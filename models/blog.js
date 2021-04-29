// MAY NOT BE REQUIRED
const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
    title: String,
    content: String,
    // time of creation is automatically stored by mongodb
})

module.exports = model("blog", blogSchema);
