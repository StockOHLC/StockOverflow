const express = require("express");
const newsController = require("../controllers/newsController");
const router = express.Router();

router.get("/currentNews", newsController.getCurrentNews, (req, res) => {
  res.status(200).json(res.locals.news);
});

router.get("/topNews", newsController.getTopNews, (req, res) => {
  res.status(200).json(res.locals.news);
});

module.exports = router;
