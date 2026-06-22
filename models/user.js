const mongoose = require("mongoose");
const {createHmac, randomBytes, hash} = require('crypto');
const {Schema, model} = require('mongoose');


const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true,
        unique: true
    },
    salt:{
        type: String,
    },
    Password: {
        type: String,
        required: true
    },
    profileImageUrl:{
        type: String,
        default:"/img/userDefault.png"
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},
{
   timestamps: true
});

userSchema.pre("save", function(next) {
    if (!this.isModified("Password")) {
        return next();
    }

    const salt = randomBytes(16).toString("hex");

    const hashedPassword = createHmac("sha256", salt)
        .update(this.Password)
        .digest("hex");

    this.salt = salt;
    this.Password = hashedPassword;
});

const User = mongoose.model("user", userSchema);

module.exports = User;