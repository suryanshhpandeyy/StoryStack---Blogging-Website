//Requirements
require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const{RestrictToLogIn} = require("./middleware/authentication")
const{checkForCookie} = require("./middleware/auth")
const Blog = require("./models/blog")
//Connection
const { connectMongoDB } = require('./connection');
connectMongoDB(process.env.MONGO_URL);
const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')


const app = express();
const PORT = 2000;

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

//Form Parser
app.use(express.urlencoded({ extended: true }));
//Cookie Parser
app.use(cookieParser());
app.use(checkForCookie("uid"))

//EJS 
app.set('view engine', 'ejs');
app.set('views',path.resolve("./views"));

//Routes
app.get('/',RestrictToLogIn, async (req,res)=>{
    const blogs = await Blog.find({})
    .sort({createdAt: -1});
    res.render("home",{
        user:req.user,
        blogs,
    });
})
app.use('/blog', blogRoute),
app.use('/user', userRoute),

//PORT Listener
app.listen(PORT, ()=>{
    console.log(`Server Started At PORT:${PORT}`);
})