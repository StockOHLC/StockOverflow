const models = require("../models/polisModels");
// bcrypt or cookies for stretch
const userController = {};
const bcrypt = require("bcryptjs");

userController.createUser = (req, res, next) => {
  // console.log("I am inside create user");
  const { email_address, password, first_name, last_name } = req.body;
  console.log("i am in create user");
  console.log(req.body);
  models.User.create({ email_address, password, first_name, last_name })
    .then(result => {
      res.locals.userInfo = {};
      res.locals.userInfo.email_address = result.email_address;
      res.locals.ssid = result._id;
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
  // console.log('req.body is', req.body)
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
          res.locals.ssid = result._id;
          return next();
        } else {
          return res.json({ message: "please enter the correct password" });
        }
      });
    }
  });
};

userController.getFavs = (req, res, next) => {
  console.log("??????????????????????");
  console.log("req.body is", req.body);
  const { email_address, stockName } = req.body;
  models.Fav.findOne({ userId })
    .then(result => {
      console.log("result in getFav is", result);
      res.locals.favList = result;
      next();
    })
    .catch(err => {
      next({
        log: `userController.getFav: ERROR: ${err}`,
        message: {
          err:
            "Error occurred in userController.getFav Check server logs for more details."
        }
      });
    });
  models.Fav.findOne({ email_address }, (err, result) => {
    if (result === null) {
      console.log("nothing bro in getFavs");
      next();
    }
    if (err)
      return next(
        "Error in userController.getAllUsers: " + JSON.stringify(err)
      );
    res.locals.favList = result;
    next();
  });
};

userController.addFavs = (req, res, next) => {
  console.log(
    "req.body that was passed from getFavs now in addFav is",
    req.body
  );
  // console.log(res.locals.favList)
  const { email_address, favStockId } = req.body;
  models.User.updateOne(
    // {email_address},
    {
      $addToSet: {
        favorites: favStockId
      }
    },
    err => {
      // console.log('result in addFav', result);
      if (err)
        return next("Error in userController: addFavs: " + JSON.stringify(err));
    }
  );
  models.User.findOne({ email_address }, (err, result) => {
    console.log(result.favorites);
    res.locals.addedFav = result.favorites;
    console.log("res.locals.addedFav ===========", res.locals.addedFav);
  });
  next();
};

userController.removeFav = (req, res, next) => {
  console.log(req.body);
  const { email_address, removeStockId } = req.body;
  models.User.updateOne(
    // {email_address},
    {
      $pull: {
        favorites: removeStockId
      }
    },
    err => {
      if (err)
        return next(
          "Error in userController: removeFav: " + JSON.stringify(err)
        );
    }
  );
  models.User.findOne({ email_address }, (err, result) => {
    console.log(result.favorites);
    res.locals.removedFav = result.favorites;
    console.log("res.locals.removedFav ===========", res.locals.removedFav);
  });
  next();
};

module.exports = userController;
