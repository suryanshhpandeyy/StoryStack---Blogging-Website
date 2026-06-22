const mongoose = require("mongoose");
const {Schema, model} = require('mongoose');

const blogSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Body:{
        type: String,
        required: true,
    },
    CoverImageURL: {
        type: String,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
},
{
   timestamps: true
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;