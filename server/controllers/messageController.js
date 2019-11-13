const {Message} = require('../models/polisModels');
//socket.io
//http
const messageController = {};

messageController.getMessages = (req, res, next) => {
    Message.find({}, (err, messages) => {
        if (err) return res.send(404, {'Error: ': err });
        res.locals.messages = messages;
        //what about time stamp?
        next();
    })
}

messageController.postMessages = (req, res, next) => {
    const {name, message} = req.body; 
    Message.create({name, message}, (err, result) => {
        if (err) {
            console.log('err:', err)
            return res.send(404, {'Error: ': err});
        }
        res.locals.message = result;
        next();
    })
}

module.exports = messageController;