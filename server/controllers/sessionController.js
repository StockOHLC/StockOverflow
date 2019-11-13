const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
    Session.find({ cookieId: req.cookies.ssid}, (err, session) => {
        if (err) {
            return next('Error in sessionController.isLoggedIn' + JSON.stringify(err));
        } else if (!session.length) { 
            res.send(alert("please sign in again!")) 
        } else { 
            return next();
        }
    })
}

sessionController.startSession = (req, res, next) => {
    const ssid = res.locals.id;
    Session.create({ cookieId: ssid}, (err, session) => {
        if (err) {
            return next('Error in sessionController.startSession', JSON.stringify(err));
    } else { 
        return next();
    };
})};

module.exports = sessionController;