const router = require('express').Router()
const {
    addMessage,
    getMess,
} = require('../controller/message')

router.post('/', addMessage);
router.get('/:conversationId', getMess);

module.exports = router
