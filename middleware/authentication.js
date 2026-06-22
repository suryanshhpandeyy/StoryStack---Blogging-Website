const {getUser} = require('../services/authentication')

async function RestrictToLogIn(req,res,next) {
    const userUID = req.cookies.uid;
    if(!userUID) return res.redirect('/user/login');

    const user = getUser(userUID);
    if(!user) return res.redirect('/user//login');

    req.user=user;
    next();
}

module.exports = {RestrictToLogIn};