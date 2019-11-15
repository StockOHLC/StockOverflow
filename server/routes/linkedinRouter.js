const express = require('express');
const router = express.Router();
const path = require('path');
const linkedinController = require('../controllers/linkedinController.js');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

router.get('/callback', 
    linkedinController.getAccessToken, 
    linkedinController.getUserData, 
    // figure out what to get from linkedin using access token and how to use that to authorize a session
    // cookieController.setSSIDCookie,
    // sessionController.startSession,
    (req, res) => {
    backURL = req.header('Referer') || '/';
    res.redirect(backURL);
})




module.exports = router;