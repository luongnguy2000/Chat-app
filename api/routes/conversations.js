const router = require('express').Router()
const {
    newConv,
    getConv,
    getConvTwoUser,
} = require('../controller/conversations')

router.post('/', newConv);
router.get('/:userId', getConv);
router.get('/find/:firstUserId/:secondUserId')

module.exports = router