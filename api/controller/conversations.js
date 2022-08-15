
const Conversation = require('../models/Conversations')

const newConv = async (req, res, next) => {
    const newConv = new Conversation({
        memebers: [req.body.senderId, req.body.recerverId]
    })
    try {
        const savedConv = await newConv.save()
        res.status(200).json(savedConv)
    } catch (err) {
        next(err)
    }
}
const getConv = async (req, res, next) => {
    try {
        const conv = await Conversation.find({
            members: { $in: [req.params.userId] }
        })
        res.status(200).json(conv)
    } catch (err) {
        next(err)
    }
}
const getConvTwoUser = async (req, res, next) => {
    try {
        const conversations = await Conversation.findOne({
            members: {
                $all: [req.params.firstUserId,
                req.params.secondUserId]
            },
        })
        res.status(200).json(conversations)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    newConv,
    getConv,
    getConvTwoUser,
}
