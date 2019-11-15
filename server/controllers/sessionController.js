const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
    Session.find({ cookieId: req.cookies.ssid}, (err, session) => {
        if (err) {
            return next('Error in sessionController.isLoggedIn' + JSON.stringify(err));
        } else if (!session.length) { 
            res.locals.isLoggedIn = false;
            return next();
        } else { 
            res.locals.isLoggedIn = true;
            console.log("sessionController.isloggedin next")
            return next();
        }
    })
}

sessionController.startSession = (req, res, next) => {
    const ssid = res.locals.ssid;
    console.log("THIS IS RES.LOCALS.SSID>>>>>>>>>>>>", ssid)
    Session.create({ cookieId: ssid })
        .then(()=> {
            console.log("i am in startSession: created successfully")
            return next()})
        .catch(err => { 
            console.log("i am in startSession: error ", err)
            
           return next(err)
        })
}

//         if (err) {
//             return next('Error in sessionController.startSession', JSON.stringify(err));
//     } else {
//         console.log("i am at t he end of startSession")
//         return next();
//     };
// })};

module.exports = sessionController;