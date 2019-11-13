const Message = require('../models/polisModels');
//socket.io
//http

const messageController = {};

messageController.getMessages = (req, res, next) => {
    console.log('in getmessage controller')
    Message.find({}, (err, messages) => {
        if (err) return res.send(404, {'Error: ': err });
        res.locals.messages = messages;
        //what about time stamp?
        next();
    })
}

messageController.postMessages = (req, res, next) => {
    console.log('in postmessage controller')
    const {name, message} = req.body; //do i have to put timestamp in here?
    Message.create({name, message}, (err, result) => {
        if (err) {
            return res.send(404, {'Error: ': err});
        }
        res.locals.message = result;
        next();
    })
}

module.exports = messageController;