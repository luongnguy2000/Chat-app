const Message = require('../models/Message')
const { createError } = require('../until/errors')


const addMessage = async (req, res, next) => {
    const newMess = new Message(req.body)
    try {
        const savedMess = await newMess.save()
        res.status(200).json(savedMess)
    } catch (err) {
        next(err)
    }
}

const getMess = async (req, res, next) => {
    try {
        const message = await Message.find({
            conversationId: req.params.conversationId,
        })
        res.status(200).json(message)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    addMessage,
    getMess,
}