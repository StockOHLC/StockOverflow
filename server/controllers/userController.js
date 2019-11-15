const models = require("../models/polisModels");
// bcrypt or cookies for stretch
const userController = {};
const bcrypt = require("bcryptjs");

userController.createUser = (req, res, next) => {
  // console.log("I am inside create user");
  const { email_address, password, first_name, last_name } = req.body;
  // console.log("i am in create user");
  console.log(req.body);

  let r = Math.random()
    .toString(36)
    .substring(7);
  models.User.create({ email_address, password, first_name, last_name })
    .then(result => {

      console.log(result);

      res.locals.userInfo = {};
      res.locals.userInfo.email_address = result.email_address;
      res.locals.userInfo.favorites = result.favorites;

      res.locals.ssid = r;
      res.locals.isLoggedIn = false;
      next();
    })
    .catch(err => {
      next({
        log: `userController.createUser: ERROR: ${err}`,
        message: {
          err:
            "Error occurred in userController.createUser Check server logs for more details."
        }
      });
    });
};

userController.verifyUser = (req, res, next) => {
  const { email_address, password } = req.body;

  let r = Math.random()
    .toString(36)
    .substring(7);
  models.User.findOne({ email_address }, (err, result) => {
    if (result === null) {
      console.log("user put a incorrect username or password");
      res.locals.userInfo = { message: "No Such User" };
      return next(res.locals.userInfo);
    } else {
      bcrypt.compare(password, result.password, (error, match) => {
        if (error) {
          return next(error);
        }
        if (match) {
          console.log(result);
          res.locals.userInfo = {};
          res.locals.userInfo.email_address = result.email_address;
          res.locals.userInfo.favorites = result.favorites;
          res.locals.ssid = r;
          return next();
        } else {
          return res.json({ message: "please enter the correct password" });
        }
      });
    }
  });
};

userController.getFavs = (req, res, next) => {
  //if res.locals.isLoggedIn === false =>sign in please!
  const { email_address, stockName } = req.body;

  models.User.findOne({ email_address }, (err, result) => {
    if (err) {
      return next(err);
    }
    res.locals.email_address = result.email_address;
    res.locals.first_name = result.first_name;
    res.locals.last_name = result.last_name;
    res.locals.favorites = result.favorites;
    return next();
  });
};

userController.addFavs = (req, res, next) => {
  const { favStockId, email_address } = req.body;

  models.User.updateOne({ $addToSet: { favorites: favStockId } }, err => {
    if (err) {
      return next("Error in userController: addFavs: " + JSON.stringify(err));
    } else {
      return next();
    }
  });
};

userController.removeFav = (req, res, next) => {
  console.log(" THIS IS THE REQ.BODY >>>>>>>>>>>>>>>>>>>>>", JSON(req.body));
  const { email_address, removeStockId } = req.body;

  console.log("email: ", email_address);
  console.log("remove stock id: ", removeStockId);

  models.User.updateOne({ $pull: { favorites: removeStockId } }, err => {
    if (err) {
      return next("Error in userController: removeFav: " + JSON.stringify(err));
    }
    return next();
  });
  // models.User.findOne({ email_address }, (err, result) => {
  //   console.log(result.favorites);
  //   res.locals.removedFav = result.favorites;
  //   console.log("res.locals.removedFav ===========", res.locals.removedFav);
  // });
  // next();
};

module.exports = userController;
