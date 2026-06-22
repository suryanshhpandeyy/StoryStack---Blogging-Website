const mongoose = require("mongoose");
const{Schema, model}  = require("mongoose");

const commentSchema  = new mongoose.Schema({
    Content:{
        type:String,
        required:true
    },
    blogId:{
        type:Schema.Types.ObjectId,
        ref:"blog"
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
},
{timestamps:true});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;