const {Router} = require("express");
const { createHmac } = require("crypto");
const User = require("../models/user");
const {setUser} = require('../services/authentication')

const router = Router();

router.get('/login',(req,res) =>{
    return res.render("login");
})
router.get('/signup',(req,res) =>{
    return res.render("signup");
})

//Handle LogOut
router.get('/logout',(req,res) => {
    res.clearCookie("uid").redirect("/");
})

//Handle SignUp
router.post('/signup', async (req,res)=>{
    const{Name, Email, Password}=req.body;

    const existingUser = await User.findOne({ Email });

    if (existingUser) {
        return res.render("signup", {
            error: "User Already Exist !!"
        });
    }
    await User.create({Name, Email, Password});
    return res.redirect("/");
})


//Handle LogIn
router.post("/login", async (req, res) => {
    const { Email, Password } = req.body;

    const existingUser = await User.findOne({ Email });

    if (!existingUser) {
        return res.render("login",{
            error:"No User Exists !!"
        });
    }
    const hashedPassword = createHmac(
        "sha256",
        existingUser.salt
    )
        .update(Password)
        .digest("hex");
    if (hashedPassword !== existingUser.Password) {
        return res.render("login",{
            error:"Wrong Password !!"
        });
    }
    const token = setUser(existingUser);
    res.cookie('uid', token);
    return res.redirect("/");
});

module.exports = router;