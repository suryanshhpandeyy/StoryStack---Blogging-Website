require("dotenv").config();
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

function setUser(user){
    return JWT.sign({
        _id:user._id,
        email:user.email
},secret
);}
function getUser(token){
    if(!token) return null;
    return JWT.verify(token, secret)
}

module.exports = {setUser, getUser};