const Post = require("../models/Posts");
const User = require("../models/User");
const { createError } = require('../until/errors')
const createPost = async (req, res, next) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (err) {
        next(err)
    }
}

const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json('The post has been updated')
        } else {
            res.status(403).json('You can update only your post')
        }
    } catch (err) {
        next(err)
    }
}

const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json('The post has been deleted')
        } else {
            res.status(403).json('The post can delete only you post')
        }
    } catch (err) {
        next(err)
    }
}

const likeOrDislikePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).json('The post has been liked')
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).json('The post has been disliked')
        }
    } catch (err) {
        next(err)
    }
}

const getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        next(err)
    }
}

const getTimelinePost = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const userPost = await Post.find({ userId: currentUser._id })
        const friendPost = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId })
            })
        )
        res.status(200).json(userPost.concat(...friendPost))
    } catch (err) {
        next(err)
    }
}
const getUserAllPost = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        const post = await Post.find({ userId: user._id })
        res.status(200).json(post)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    likeOrDislikePost,
    getPost,
    getTimelinePost,
    getUserAllPost,
}