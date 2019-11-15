const fetch = require("node-fetch");
const newsController = {};

newsController.getCurrentNews = (req, res, next) => {
  const { stock } = req.body;
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  // console.log(today);
  fetch(
    `https://newsapi.org/v2/everything?q=${stock}&from=${today}&sortBy=popularity&apiKey=cb4a8ab6553b4bb3aaa76d6b44177db4`
  )
    .then(result => result.json())
    .then(result => {
      const articlesOnly = result["articles"];
      res.locals.news = articlesOnly;
      next();
    })
    .catch(err => console.log(err));
};

newsController.getTopNews = (req, res, next) => {
  // console.log(`Step 2: newsController.js Line 25`);
  fetch(
    `https://newsapi.org/v2/top-headlines?sources=the-wall-street-journal&apiKey=cb4a8ab6553b4bb3aaa76d6b44177db4`
  )
    .then(result => result.json())
    .then(result => {
      res.locals.news = result.articles;
      next();
    });
};

module.exports = newsController;
