const cookieController = {};

// @param req 
// @param res
// @param runInNewContext

cookieController.setSSIDCookie = (req, res, next) => {
    console.log("i am in ssid cookiecontroller")
    if (res.locals.isLoggedIn === false) { 
    res.cookie('ssid', res.locals.ssid, {httpOnly: true})
    return next();
} else { 
    return next();
    }
}


module.exports = cookieController;