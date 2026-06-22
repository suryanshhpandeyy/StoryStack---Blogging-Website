const {getUser} = require('../services/authentication')

function checkForCookie(cookieName){
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]
        if(!tokenCookieValue){
            return next();
        }
        try {
            const userPayLoad = getUser(tokenCookieValue);
        } catch (error) {}
        return next();
    };
}

module.exports = {
    checkForCookie
}