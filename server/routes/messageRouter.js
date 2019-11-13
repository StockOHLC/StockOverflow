const express = require('express');
const router = express.Router();
const app = express();
const messageController = require('../controllers/messageController') 

//get messages from database
router.get('/', messageController.getMessages, (req, res) => {
  console.log('in get router')
    res.json(res.locals.messages);
  });

//post the messages to the database
router.post('/', messageController.postMessages, (req, res) => {
  console.log('in post router')
  res.json(res.locals.message);
});

module.exports = router;