const fetch = require('node-fetch')
// put in dotenv
const CLIENT_ID = '86px63z2kbb0hj';
const CLIENT_SECRET = 'ihJj32DH44yeFdfZ';

const linkedinController = {};

linkedinController.getAccessToken = (req, res, next) => {
   const code = req.query.code;
   // console.log(code);
   
   fetch(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:8080/oauth/linkedin/callback&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`, {
      method: "POST",
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
   })
   .then(resp => resp.json())
   .then(data => {
      res.locals.access_token = data.access_token;
      return next();
   })
   .catch((err) => console.log(err));
}

linkedinController.getUserData = (req, res, next) => {
   const access_token = res.locals.access_token;
   fetch(`https://api.linkedin.com/v2/liteprofile`, {
      headers: {
         'Content-Type': 'application/json',
         Connection: 'Keep-Alive',
         Authorization: 'Bearer ' + access_token,
      },
   })
   .then(resp => resp.json())
   .then(data => {
      console.log(data);
      return next();
   })
   .catch((err) => console.log(err));
};

module.exports = linkedinController;