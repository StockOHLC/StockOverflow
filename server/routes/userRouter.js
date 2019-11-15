const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
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
  userController.getFavs,
  stocksController.getBuys,
  (req, res) => {
    console.log("i am in the end", res.locals.email_address)
    res.status(200).json({
      email_address: res.locals.email_address,
      first_name: res.locals.first_name,
      last_name: res.locals.last_name,
      favorites: res.locals.favorites,
      buys: res.locals.buys
    })
  }
);

router.post("/addfav", userController.addFavs, userController.getFavs, (req, res) =>
   res.status(200).json({
     updatedFavorites: res.locals.favorites
     })
);

router.post("/removefav", userController.removeFav, userController.getFavs, (req, res) =>
  res.status(200).json({
    updatedFavorites: res.locals.getFavs
  })
);

module.exports = router;
