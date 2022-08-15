const router = require('express').Router()
const {
    createPost,
    updatePost,
    deletePost,
    likeOrDislikePost,
    getPost,
    getTimelinePost,
    getUserAllPost,
} = require('../controller/posts')


router.post('/', createPost)
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like', likeOrDislikePost);
router.get('/:id', getPost)
router.get('/timeline/:userId', getTimelinePost);
router.get('/profile/:username', getUserAllPost)

module.exports = router