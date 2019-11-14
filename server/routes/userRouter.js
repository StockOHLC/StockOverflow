const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const stocksController = require("../controllers/stocksController");
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

router.post(
  "/signup", 
  userController.createUser, 
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) =>
  res.status(200).json(res.locals.userInfo)
);

router.post(
  "/login",
  userController.verifyUser,
  sessionController.isLoggedIn,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  // stocksController.getBuys,
  (req, res) => {
    console.log("i am in the end")
    res.status(200).json(res.locals.userInfo)
  }
);

router.post("/addfav", sessionController.isLoggedIn, userController.addFavs, (req, res) =>
  res.status(200).json(res.locals.addedFav)
);

router.post("/removefav", sessionController.isLoggedIn, userController.removeFav, (req, res) =>
  res.status(200).json(res.locals.removedFav)
);

module.exports = router;
