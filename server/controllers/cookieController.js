const cookieController = {};

// @param req 
// @param res
// @param runInNewContext

cookieController.setSSIDCookie = (req, res, next) => {
    res.cookie('ssid', res.locals.id, {httpOnly: true})
    return next();
}


module.exports = cookieController;