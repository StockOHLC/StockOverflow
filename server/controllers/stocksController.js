const models = require("../models/polisModels");
const fetch = require("node-fetch");

const stocksController = {};

stocksController.getBuys = (req, res, next) => {
  console.log("inside get buy");
  const { email_address } = req.body;
  models.Buy.find({ email_address }, (err, buys) => {
    if (err)
      return next("Error in stocksController.getBuys: " + JSON.stringify(err));
    res.locals.buys = buys;
    return next();
  });
};

stocksController.addBuy = (req, res, next) => {
  console.log("inside add buy");
  console.log(req.body);
  models.Buy.create(
    {
      email_address: req.body.email_address,
      boughtStockId: req.body.boughtStockId,
      date: req.body.date,
      purchasedPrice: req.body.purchasedPrice,
      numberOfShares: req.body.numberOfShares
    },
    (err, buys) => {
      console.log("in here");
      if (err)
        return next("Error in stocksController.addBuy: " + JSON.stringify(err));
      console.log(buys);
      res.locals.buys = buys;
      return next();
    }
  );
};

stocksController.deleteBuy = (req, res, next) => {
  console.log("inside delete buy");
  const { email_address, boughtStockID } = req.body;
  models.Buy.remove({ email_address, boughtStockID }, (err, buys) => {
    if (err)
      return next(
        "Error in stocksController.deleteBuy: " + JSON.stringify(err)
      );
    res.locals.buys = buys;
    return next();
  });
};

stocksController.getAllPastStock = (req, res, next) => {
  const symbol = req.params.stockId;
  models.PastStock.findOne({ stockSymbol: symbol }, (err, result) => {
    console.log(result);
    if (err) {
      return next("Error in stocksControllers.getAllPastStock");
    }
    if (result === null) {
      console.log("nothing found in getallparststock");
      fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=VRFP7Q7L5C1DU3EH`
      )
        .then(result => result.json())
        .then(result => {
          const finalResult = [];
          for (let key in result["Time Series (Daily)"]) {
            let innerObj = {};
            innerObj[key] = result["Time Series (Daily)"][key]["4. close"];
            finalResult.push(innerObj);
          }
          models.PastStock.create({
            stockSymbol: symbol,
            changes: finalResult
          }).then(result => {
            console.log("this should be whats saved to db", result);
            res.locals.pastStock = result;
            next();
          });
        })
        .catch(err => console.log(err));
    } else {
      res.locals.pastStock = result;
      return next();
    }
  });
};
module.exports = stocksController;
